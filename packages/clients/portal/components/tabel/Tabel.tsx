import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

import { DeskTabelMemo as DeskTabel } from './DeskTabel';
import { MobileTabelMemo as MobileTabel } from './MobileTabel';
import { UsersListMemo as UsersList } from './UsersList';
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

import { useRouter } from 'next/router';
import { Paper } from '../paper/Paper';

export const Tabel = ({ listAllUsers, setListAllUsers }) => {
  const { screenWidth } = useBreakpoint();
  const router = useRouter();

  const [state, setState] = useState<StaticState>('idle');
  const [activeUser, setActiveUser] = useState<string>('');
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isModuleOpen, setIsModuleOpen] = useState<boolean>(false);
  const [checkedUsersList, setCheckedUsersList] = useState<string[]>([]);
  const [modalNameOpen, setModalNameOpen] = useState<StaticFormName>('add');
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isShowMobileSearch, setIsShowMobileSearch] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [inputValue, setInputValue] = useState<string>(
    firstOf(router.query?.search) || '',
  );
  const [pageNumber, setPageNumber] = useState<number>(+router.query?.page - 1 || 0);
  const [pagesInfo, setPagesInfo] = useState([]);
  const [sortBy, setSortBy] = useState<string>(
    firstOf(router.query?.sortBy) || 'email',
  );
  const [sortedFrom, setSortedFrom] = useState<string>(
    firstOf(router.query?.direction) || 'asc',
  );

  const debouncedInputValue = useDebounce(inputValue, 500);
  const isMobile = screenWidth < BREAKPOINTS.md;

  const getLastShowedResultNumber = () => {
    let lastNumber = pagesInfo[0].perPage * (pageNumber + 1);
    return lastNumber <= pagesInfo[0].total ? lastNumber : pagesInfo[0].total;
  };

  useEffect(() => {
    if (typeof window === undefined || !router.query) return;
    setPageNumber(+router.query?.page - 1 || 0);
    const sortDirection = firstOf(router.query?.direction) || 'asc';
    setSortedFrom(sortDirection);
    setInputValue(firstOf(router.query?.search) || '');
    setSortBy(firstOf(router.query?.sortBy) || 'email');
  }, [router.query]);

  useEffect(() => {
    if (typeof window === undefined || !router.query) return;
    const perPage = 10;

    if (Math.ceil(listAllUsers.length / perPage) < +router.query?.page) {
      addParams([{ key: 'page', value: Math.ceil(listAllUsers.length / perPage) }]);
      return;
    }

    if (debouncedInputValue) {
      let foundUsersList = listAllUsers.filter((item) =>
        item.email.toLowerCase().includes(debouncedInputValue),
      );

      setPagesInfo([
        {
          maxPage: Math.ceil(foundUsersList.length / perPage),
          total: foundUsersList.length,
          perPage: perPage,
        },
      ]);
      setPageNumber(0);
      setUsersList(foundUsersList.slice(0, perPage));
    } else {
      setPagesInfo([
        {
          maxPage: Math.ceil(listAllUsers.length / perPage),
          total: listAllUsers.length,
          perPage: perPage,
        },
      ]);

      if (pageNumber === 0) {
        setUsersList(listAllUsers.slice(0, perPage));
      } else if (pageNumber > 0) {
        const startSliceFrom = pageNumber * perPage;

        setUsersList(listAllUsers.slice(startSliceFrom, startSliceFrom + perPage));
      }
    }
    setState('success');
  }, [pageNumber, sortedFrom, debouncedInputValue, sortBy]);

  useEffect(() => {
    if (checkedUsersList.length === pagesInfo[0]?.total) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [checkedUsersList.length, pagesInfo]);

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
    setIsCheckAll(usersList.every(({ email }) => checkedUsersList.includes(email)));
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

  const handleSelectAll = async (e) => {
    if (isSelectedAll) {
      setCheckedUsersList([]);
    } else {
      setCheckedUsersList([...listAllUsers.map((item) => item.email)]);
    }
  };

  const handleSelectAllOnPage = (e) => {
    setIsCheckAll(!isCheckAll);
    let newListId;

    if (isCheckAll) {
      newListId = usersList.map((item) => item.email);

      setCheckedUsersList([
        ...checkedUsersList.filter((item) => !newListId.includes(item)),
      ]);
    } else {
      newListId = [...usersList.map((item) => item.email)].filter(
        (item) => !checkedUsersList.includes(item),
      );

      setCheckedUsersList([...checkedUsersList, ...newListId]);
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
      <div className="flex flex-col justify-between gap-3 mb-3">
        <div className="flex gap-4 text-indigo-500 mb-4 md:mb-0 items-center">
          <Title size="xs">Users</Title>
          {Boolean(checkedUsersList.length) && !isShowMobileSearch && (
            <div className="py-0.5 px-2 bg-indigo-50">
              <p>{`${checkedUsersList.length} of ${formatNumberWithCommas(
                pagesInfo[0].total,
              )} selected`}</p>
            </div>
          )}
          <div className="ml-auto">
            {isMobile ? (
              <div className="flex items-center gap-2">
                {isShowMobileSearch && (
                  <Search
                    inputValue={inputValue}
                    setInputValue={(value) => {
                      addParams([{ key: 'search', value }]);
                    }}
                  />
                )}
                <Button
                  icon="SearchIcon"
                  as="button"
                  size="md"
                  onClick={() => setIsShowMobileSearch(!isShowMobileSearch)}
                />
              </div>
            ) : (
              <Search
                inputValue={inputValue}
                setInputValue={(value) => {
                  addParams([{ key: 'search', value }]);
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-rows gap-3 lg:gap-6 md:justify-end">
          <div className="mr-auto">
            <Button
              label={isSelectedAll ? 'Deselect All' : 'Select All'}
              align="center"
              size="md"
              onClick={handleSelectAll}
              theme={isSelectedAll ? 'red' : 'green'}
            />
          </div>
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
                handleSelectAllOnPage={handleSelectAllOnPage}
                getLastShowedResultNumber={getLastShowedResultNumber}
                isCheckAll={isCheckAll}
                pageNumber={pageNumber}
                decrementPage={decrementPage}
                incrementPage={incrementPage}
                pagesInfo={pagesInfo}
                // setSort={(value) => addParams([{ key: 'sortBy', value }])}
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
                getLastShowedResultNumber={getLastShowedResultNumber}
                handleSelectAllOnPage={handleSelectAllOnPage}
                isCheckAll={isCheckAll}
                items={usersList}
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
          // getUsersData={getUsersData}
          setUsersList={setUsersList}
          setCheckedUsersList={setCheckedUsersList}
        />
      </Dialog>
    </div>
  );
};

export const TabelMemo = React.memo(Tabel);
