import React, { useState, useEffect, useMemo } from 'react';
import { CSVLink } from "react-csv";
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
import { formatDate } from '../../helpers/utils/date';
import { formatNumberWithCommas } from '../../helpers/utils/string';
import { fileHeaders, getUsersToExport } from './TabelOptions';
import {
  StaticState,
  StaticFormName,
  ParamsListType,
} from '../../types';
import { Filter } from '../filter/Filter';

import { useRouter } from 'next/router';
import { Paper } from '../paper/Paper';

export const Tabel = ({ listAllUsers }) => {
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
  const [usersListPerPage, setUsersListPerPage] = useState([]);
  const [usersList, setUsersList] = useState([...listAllUsers]);
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
  
  const usersForExport = useMemo(() => getUsersToExport({ listAllUsers, checkedUsersList }), [listAllUsers, checkedUsersList]);

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
    if (sortBy === 'email') {
      setUsersList(
        usersList.sort((a, b) =>
          sortedFrom === 'asc'
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]),
        ),
      );
    } else if (sortBy === 'first_date' || sortBy === 'last_date') {
      setUsersList(
        usersList.sort((a, b) => {
          const newDateA = Date.parse(formatDate(a[sortBy]));
          const newDateB = Date.parse(formatDate(b[sortBy]));
          return sortedFrom === 'asc' ? newDateA - newDateB : newDateB - newDateA;
        }),
      );
    }
  }, [sortBy, sortedFrom]);

  useEffect(() => {
    if (typeof window === undefined || !router.query) return;
    const perPage = 10;
    let finalUsersList = null;

    if (Math.ceil(usersList.length / perPage) < +router.query?.page) {
      addParams([{ key: 'page', value: Math.ceil(usersList.length / perPage) }]);
      return;
    }

    if (Boolean(debouncedInputValue)) {
      let searchedUser = listAllUsers.filter((item) =>
        item.email.toLowerCase().includes(debouncedInputValue),
      );
      setUsersList(searchedUser);
      finalUsersList = searchedUser.slice(0, perPage);
      setPagesInfo([
        {
          maxPage: Math.ceil(searchedUser.length / perPage),
          total: searchedUser.length,
          perPage: perPage,
        },
      ]);
    } else {
      setUsersList(listAllUsers);

      if (pageNumber === 0) {
        finalUsersList = usersList.slice(0, perPage);
      } else if (pageNumber > 0) {
        const startSliceFrom = pageNumber * perPage;

        finalUsersList = usersList.slice(startSliceFrom, startSliceFrom + perPage);
      }
      setPagesInfo([
        {
          maxPage: Math.ceil(usersList.length / perPage),
          total: usersList.length,
          perPage: perPage,
        },
      ]);
    }

    setUsersListPerPage(finalUsersList);
    setState('success');
  }, [pageNumber, sortBy, sortedFrom, debouncedInputValue]);

  // useEffect(() => {
  //   if (debouncedInputValue) {
  // let searchedUser = listAllUsers.filter((item) =>
  //   item.email.toLowerCase().includes(debouncedInputValue),
  // );
  //     setUsersList(searchedUser);
  //   } else {
  //     setUsersList(listAllUsers);
  //   }
  // }, [debouncedInputValue]);

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
    setIsCheckAll(
      usersListPerPage.every(({ email }) => checkedUsersList.includes(email)),
    );
  }, [checkedUsersList, checkedUsersList.length, usersListPerPage]);

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
      setCheckedUsersList([...usersList.map((item) => item.email)]);
    }
  };

  const handleSelectAllOnPage = (e) => {
    setIsCheckAll(!isCheckAll);
    let newListId;

    if (isCheckAll) {
      newListId = usersListPerPage.map((item) => item.email);

      setCheckedUsersList([
        ...checkedUsersList.filter((item) => !newListId.includes(item)),
      ]);
    } else {
      newListId = [...usersListPerPage.map((item) => item.email)].filter(
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
          {Boolean(checkedUsersList.length) && (
            <>
              <div className='relative'>
                <Button
                  as="button"
                  label={`${isMobile ? '' : 'Export'}`}
                  size="md"
                  icon="ArrowCircleUpIcon"
                  iconPosition="before"
                  align="center"
                />
                <CSVLink
                  className="absolute top-0 left-0 w-full h-full"
                  headers={fileHeaders}
                  data={usersForExport}
                  filename="users.csv"
                  target="_blank"
                />
              </div>

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
          )}
        </div>
      </div>
      <Paper>
        {state === 'success' && (
          <>
            {isMobile ? (
              <MobileTabel
                items={usersListPerPage}
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
                  items={usersListPerPage}
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
                items={usersListPerPage}
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
                  items={usersListPerPage}
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

        {usersListPerPage.length === 0 && inputValue !== '' && state !== 'loading' && (
          <div className="flex gap-4 flex-col min-h-max py-10 items-center justify-center text-indigo-500">
            <Icon name="CommonFileSearch" className="w-10 h-10" />
            <p className="font-bold">No results matching your criteria.</p>
          </div>
        )}
        {usersListPerPage.length === 0 && inputValue === '' && state !== 'loading' && (
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
          items={usersListPerPage}
          modalNameOpen={modalNameOpen}
          setIsModuleOpen={setIsModuleOpen}
          setUsersList={setUsersList}
          setCheckedUsersList={setCheckedUsersList}
        />
      </Dialog>
    </div>
  );
};

export const TabelMemo = React.memo(Tabel);
