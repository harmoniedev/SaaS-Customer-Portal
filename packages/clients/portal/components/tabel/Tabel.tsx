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
import {
  UserFields,
  StaticState,
  StaticFormName,
  ParamsListType,
} from '../../types';

import DataAPI from '../../api/data';
import { useRouter } from 'next/router';
import { Paper } from '../paper/Paper';

const dataAPI = new DataAPI();

export const Tabel = () => {
  const { accounts } = useMsal();
  debugger;
  const { screenWidth } = useBreakpoint();
  const router = useRouter();

  const [state, setState] = useState<StaticState>('idle');
  const [usersList, setUsersList] = useState<UserFields[]>([]);
  const [activeUser, setActiveUser] = useState<string>('');
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isModuleOpen, setIsModuleOpen] = useState<boolean>(false);
  const [checkedUsersList, setCheckedUsersList] = useState<string[]>([]);
  const [modalNameOpen, setModalNameOpen] = useState<StaticFormName>('add');
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
  debugger;
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

    const maxPage = Math.ceil(response.total / +response.perPage);

    if (maxPage < +router.query?.page) {
      addParams([{ key: 'page', value: maxPage }]);
      return;
    }
    setPagesInfo([
      {
        maxPage: Math.ceil(response.total / response.perPage),
        total: response.total,
        perPage: Number(response.perPage),
      },
    ]);

    setUsersList(response.data);
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
    if (!checkedUsersList?.length) return setIsCheckAll(false);
    setIsCheckAll(usersList.every(({ _id }) => checkedUsersList.includes(_id)));
  }, [checkedUsersList, checkedUsersList?.length, usersList]);

  const incrementPage = () => {
    const page =
      pagesInfo[0].maxPage !== pageNumber ? pageNumber + 1 : pagesInfo[0].maxPage;
    addParams([{ key: 'page', value: page + 1 }]);
  };

  const decrementPage = () => {
    const page = pageNumber !== 0 ? pageNumber - 1 : 0;
    addParams([{ key: 'page', value: page + 1 }]);
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setCheckedUsersList([
      ...checkedUsersList,
      ...usersList?.map((item) => item._id),
    ]);
    if (isCheckAll) {
      setCheckedUsersList([]);
    }
  };

  const handelCheckbox = (e) => {
    const { id, checked } = e.target;
    setIsCheckAll(false);
    setCheckedUsersList([...checkedUsersList, id]);
    if (!checked) {
      setCheckedUsersList(checkedUsersList.filter((item) => item !== id));
    }
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">
        <Title size="xs" className="mb-5">
          Users
        </Title>
        <div className="flex flex-rows gap-3 lg:gap-6 justify-end">
          <Search
            inputValue={inputValue}
            setInputValue={(value) => {
              addParams([{ key: 'search', value }]);
            }}
            isMobile={isMobile}
          />
          <Button
            as="button"
            label="Add User"
            onClick={() => {
              setModalNameOpen('add');
              setIsModuleOpen(!isModuleOpen);
            }}
            size="md"
            key={'add'}
          />
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
                handleSelectAll={handleSelectAll}
                getLastShowedResultNumber={getLastShowedResultNumber}
                checkedList={checkedUsersList}
                isCheckAll={isCheckAll}
                pageNumber={pageNumber}
                decrementPage={decrementPage}
                incrementPage={incrementPage}
                pagesInfo={pagesInfo}
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
                handleSelectAll={handleSelectAll}
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

        {usersList?.length === 0 && inputValue !== '' && state !== 'loading' && (
          <div className="flex gap-4 flex-col min-h-max py-10 items-center justify-center text-indigo-500">
            <Icon name="CommonFileSearch" className="w-10 h-10" />
            <p className="font-bold">No results matching your criteria.</p>
          </div>
        )}
        {usersList?.length === 0 && inputValue === '' && state !== 'loading' && (
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
