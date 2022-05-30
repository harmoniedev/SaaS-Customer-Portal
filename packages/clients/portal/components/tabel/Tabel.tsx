import { useMsal } from '@azure/msal-react';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

import { DeskTabelMemo as DeskTabel } from './DeskTabel';
import { MobileTabelMemo as MobileTabel } from './MobileTabel';
import { UsersListSceneMemo as UsersList } from '../../scenes/UsersListScene';
import { OpenFormSceneMemo as OpenForm } from '../../scenes/OpenFormScene';
import { ButtonMemo as Button } from '../../components/buttons/Button';
import { Icon } from '../icons/Icon';
import { TitleMemo as Title } from '../title/Title';
import { SearchMemo as Search } from '../search/Search';
import { BREAKPOINTS, useBreakpoint } from '../../hooks/useBreakpoint';
import { DialogMemo as Dialog } from '../../components/dialog/Dialog';
import { Spinner } from '../loaders/Spinner';
import { firstOf } from '../../helpers/utils/array';
import { formatNumberWithCommas } from '../../helpers/utils/string';
import {
  UserFields,
  StaticState,
  StaticFormName,
  ParamsListType,
} from '../../types';
import { Filter } from '../filter/Filter';

import DataAPI from '../../api/data';
import { useRouter } from 'next/router';
import { Paper } from '../paper/Paper';

const dataAPI = new DataAPI();

const listSelectedCheckBoxes = [
  { slug: 'currentPage', title: 'On current page' },
  { slug: 'allPages', title: 'On all pages' },
];

export const Tabel = () => {
  const { accounts } = useMsal();
  const { screenWidth } = useBreakpoint();
  const router = useRouter();

  const [state, setState] = useState<StaticState>('idle');
  const [usersList, setUsersList] = useState<UserFields[]>([]);
  const [activeUser, setActiveUser] = useState<string>('');
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isModuleOpen, setIsModuleOpen] = useState<boolean>(false);
  const [checkedUsersList, setCheckedUsersList] = useState<string[]>([]);
  const [modalNameOpen, setModalNameOpen] = useState<StaticFormName>('add');
  const [isSelectedBtnOpen, setIsSelectedBtnOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    firstOf(router.query?.search) || '',
  );
  const [pageNumber, setPageNumber] = useState<number>(+router.query?.page - 1 || 0);
  const [pagesInfo, setPagesInfo] = useState([]);
  const [sortBy, setSortBy] = useState<string>(
    firstOf(router.query?.sortBy) || 'name',
  );
  const [sortedFrom, setSortedFrom] = useState<string>(
    firstOf(router.query?.direction) || 'asc',
  );

  const debouncedInputValue = useDebounce(inputValue, 500);
  const isMobile = screenWidth < BREAKPOINTS.md;
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  const getLastShowedResultNumber = () => {
    let lastNumber = pagesInfo[0].perPage * (pageNumber + 1);
    return lastNumber <= pagesInfo[0].total ? lastNumber : pagesInfo[0].total;
  };

  const getUsersData = async () => {
    setState('loading');
    const response = await dataAPI.getUsers({
      tid: accounts[0]?.tenantId,
      token,
      query: debouncedInputValue,
      page: pageNumber,
      perPage: 10,
      orderedby: sortBy,
      direction: sortedFrom,
    });

    if (Math.ceil(response.total / +response.perPage) < +router.query?.page) {
      addParams([
        { key: 'page', value: Math.ceil(response.total / response.perPage) },
      ]);
      return;
    }
    setPagesInfo([
      {
        maxPage: Math.ceil(response.total / response.perPage),
        total: response.total,
        perPage: Number(response.perPage),
      },
    ]);

    setUsersList(response.users);
    setState('success');
  };

  useEffect(() => {
    if (typeof window === undefined || !router.query) return;
    setPageNumber(+router.query?.page - 1 || 0);
    const sortDirection = firstOf(router.query?.direction) || 'asc';
    setSortedFrom(sortDirection);
    setInputValue(firstOf(router.query?.search) || '');
    setSortBy(firstOf(router.query?.sortBy) || 'name');
  }, [router.query]);

  useEffect(() => {
    if (typeof window === undefined || !router.query) return;
    getUsersData();
  }, [pageNumber, sortedFrom, debouncedInputValue, sortBy]);

  const addParams = (list: ParamsListType[] = []) => {
    let newPairs = {};
    list.forEach(({ key, value }) => {
      newPairs[key] = value;
    });
    let newQuery = { ...router.query, ...newPairs };
    newQuery = Object.entries(newQuery).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a), // remove falsy values
      {},
    );

    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (!checkedUsersList.length) return setIsCheckAll(false);
    setIsCheckAll(usersList.every(({ _id }) => checkedUsersList.includes(_id)));
  }, [checkedUsersList, checkedUsersList.length, usersList]);

  const incrementPage = () => {
    const page =
      pagesInfo[0].maxPage !== pageNumber ? pageNumber + 1 : pagesInfo[0].maxPage;
    addParams([{ key: 'page', value: page + 1 }]);
  };

  const decrementPage = () => {
    const page = pageNumber !== 0 ? pageNumber - 1 : 0;
    addParams([{ key: 'page', value: page + 1 }]);
  };

  const handelCheckType = (e) => {
    switch (e.target.id) {
      case 'currentPage':
        handleSelectAllOnPage(e);
        break;
      case 'allPages':
        handleSelectAll(e);
        break;
    }
    setIsSelectedBtnOpen(false);
  };

  const handleSelectAll = async (e) => {
    if (pagesInfo[0].total === checkedUsersList.length) {
      return setCheckedUsersList([]);
    } else {
      const response = await dataAPI.getUsers({
        tid: accounts[0]?.tenantId,
        token,
        query: '',
        page: 0,
        perPage: pagesInfo[0].total,
        orderedby: sortBy,
        direction: sortedFrom,
      });
      setCheckedUsersList([...response.users.map((item) => item._id)]);
    }
  };

  const handleSelectAllOnPage = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsSelectedBtnOpen(false);
    let newListId;

    if (isCheckAll) {
      newListId = usersList.map((item) => item._id);

      setCheckedUsersList([
        ...checkedUsersList.filter((item) => !newListId.includes(item)),
      ]);
    } else {
      newListId = [...usersList.map((item) => item._id)].filter(
        (item) => !checkedUsersList.includes(item),
      );

      setCheckedUsersList([...checkedUsersList, ...newListId]);
    }
  };

  const handelCheckbox = (e) => {
    const { id, checked } = e.target;
    setIsSelectedBtnOpen(false);
    setIsCheckAll(false);
    setCheckedUsersList([...checkedUsersList, id]);
    if (!checked) {
      setCheckedUsersList(checkedUsersList.filter((item) => item !== id));
    }
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col justify-between gap-3 mb-3">
        <div className="flex gap-4 text-indigo-500 mb-4 md:mb-0">
          <Title size="xs">Users</Title>
          {Boolean(checkedUsersList.length) && (
            <div className="py-0.5 px-2 bg-indigo-50">
              <p>{`${checkedUsersList.length} of ${formatNumberWithCommas(
                pagesInfo[0].total,
              )} selected`}</p>
            </div>
          )}
        </div>
        <div className="flex flex-rows gap-3 lg:gap-6 md:justify-end">
          <Search
            inputValue={inputValue}
            setInputValue={(value) => {
              addParams([{ key: 'search', value }]);
            }}
          />
          <Filter isMobile={isMobile} />
          {Boolean(checkedUsersList.length) ? (
            <>
              <Button
                as="button"
                label={`${isMobile ? '' : 'Export'}`}
                size="md"
                icon="ArrowCircleUpIcon"
                iconPosition="before"
                align="center"
              />
              <Button
                as="button"
                label={`${isMobile ? '' : 'Delete'}`}
                size="md"
                icon="TrashIcon"
                iconPosition="before"
                theme="red"
                align="center"
                onClick={() => {
                  setModalNameOpen('deleteAll');
                  setIsModuleOpen(true);
                }}
              />
            </>
          ) : (
            <Button
              as="button"
              label={`${isMobile ? 'Add' : 'Add User'}`}
              onClick={() => {
                setModalNameOpen('add');
                setIsModuleOpen(!isModuleOpen);
              }}
              // icon="UserAddIcon"
              size="md"
              key={'add'}
            />
          )}
        </div>
      </div>
      <Paper>
        {state === 'success' && (
          <>
            {isMobile ? (
              <MobileTabel
                items={usersList}
                setModalNameOpen={setModalNameOpen}
                setIsModuleOpen={setIsModuleOpen}
                handleSelectAllOnPage={handleSelectAllOnPage}
                getLastShowedResultNumber={getLastShowedResultNumber}
                checkedList={checkedUsersList}
                isCheckAll={isCheckAll}
                pageNumber={pageNumber}
                decrementPage={decrementPage}
                incrementPage={incrementPage}
                pagesInfo={pagesInfo}
                setSort={(value) => addParams([{ key: 'sortBy', value }])}
                listSelectedCheckBoxes={listSelectedCheckBoxes}
                handelCheckType={handelCheckType}
                setIsSelectedBtnOpen={setIsSelectedBtnOpen}
                isSelectedBtnOpen={isSelectedBtnOpen}
              >
                <UsersList
                  activeUser={activeUser}
                  checkedList={checkedUsersList}
                  handelCheckbox={handelCheckbox}
                  isMobile={isMobile}
                  items={usersList}
                  setActiveUser={setActiveUser}
                  setIsModuleOpen={setIsModuleOpen}
                  setModalNameOpen={setModalNameOpen}
                />
              </MobileTabel>
            ) : (
              <DeskTabel
                setSort={(value) => addParams(value)}
                setIsModuleOpen={setIsModuleOpen}
                getLastShowedResultNumber={getLastShowedResultNumber}
                handleSelectAllOnPage={handleSelectAllOnPage}
                checkedList={checkedUsersList}
                isCheckAll={isCheckAll}
                items={usersList}
                setModalNameOpen={setModalNameOpen}
                setSortedFrom={(value) => addParams([{ key: 'direction', value }])}
                sortBy={sortBy}
                sortedFrom={sortedFrom}
                pageNumber={pageNumber}
                decrementPage={decrementPage}
                incrementPage={incrementPage}
                pagesInfo={pagesInfo}
                listSelectedCheckBoxes={listSelectedCheckBoxes}
                handelCheckType={handelCheckType}
                setIsSelectedBtnOpen={setIsSelectedBtnOpen}
                isSelectedBtnOpen={isSelectedBtnOpen}
              >
                <UsersList
                  activeUser={activeUser}
                  checkedList={checkedUsersList}
                  handelCheckbox={handelCheckbox}
                  isMobile={isMobile}
                  items={usersList}
                  setActiveUser={setActiveUser}
                  setIsModuleOpen={setIsModuleOpen}
                  setModalNameOpen={setModalNameOpen}
                />
              </DeskTabel>
            )}
          </>
        )}

        {state === 'loading' && (
          <div className="w-full py-12 flex justify-center">
            <div className="w-20 h-20">
              <Spinner />
            </div>
          </div>
        )}

        {usersList.length === 0 && inputValue !== '' && state !== 'loading' && (
          <div className="flex gap-4 flex-col min-h-max py-10 items-center justify-center text-indigo-500">
            <Icon name="CommonFileSearch" className="w-10 h-10" />
            <p className="font-bold">No results matching your criteria.</p>
          </div>
        )}
        {usersList.length === 0 && inputValue === '' && state !== 'loading' && (
          <div className="flex gap-4 flex-col min-h-max py-10 items-center justify-center text-indigo-500">
            <Icon name="UserPlus" className="w-10 h-10" />
            <p className="font-bold">Need to add first user.</p>
          </div>
        )}
      </Paper>
      <Dialog mode="form" onOpenChange={setIsModuleOpen} open={isModuleOpen}>
        <OpenForm
          activeUser={activeUser}
          checkedUsersList={checkedUsersList}
          isCheckAll={isCheckAll}
          items={usersList}
          modalNameOpen={modalNameOpen}
          setIsModuleOpen={setIsModuleOpen}
          getUsersData={getUsersData}
          setUsersList={setUsersList}
          setCheckedUsersList={setCheckedUsersList}
        />
      </Dialog>
    </div>
  );
};

export const TabelMemo = React.memo(Tabel);
