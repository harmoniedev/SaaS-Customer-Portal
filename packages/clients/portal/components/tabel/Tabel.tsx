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

export const Tabel = ({ token }) => {
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
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isShowMobileSearch, setIsShowMobileSearch] = useState(false);
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
  // const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  // const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  const getLastShowedResultNumber = () => {
    let lastNumber = pagesInfo[0].perPage * (pageNumber + 1);
    return lastNumber <= pagesInfo[0].total ? lastNumber : pagesInfo[0].total;
  };


  const getUsersData = async () => {
    setState('loading');
    // const response = await dataAPI.getUsers({
    //   tid: accounts[0]?.tenantId,
    //   token,
    //   query: debouncedInputValue,
    //   page: pageNumber,
    //   perPage: 10,
    //   orderedby: sortBy,
    //   direction: sortedFrom,
    // });


    ///here need pass token in future
    const response = await fetch('https://status-manager.harmon.ie/domain_data/harmon.ie', {
      headers: {
        authorization: 'Bearer eyJhbGciOiJFUzUxMiIsImp3ayI6eyJrdHkiOiJFQyIsImNydiI6IlAtNTIxIiwieCI6IkFZeWFIeUZGejBjYmhkVDZHbHpjazNTVkYwLXpVM1AzdGNkM3RGdnFMUUF0eHZBWGU0eGlGWUVvbTFyWGNDQkZLLTdNUlJ6ZERlYkJ3QXNzMHVzZmg4SHEiLCJ5IjoiQVk0N1F6OWVGNWpSNXVqRU94YXUzcnFzR2dtSUcyZ0d2eHR1OU1uSl9uLWxxSzNlU2lGclNsdTJMVUR6bjVhOGpRVU8wQ2pyb3lQYVJNTW9QdUlzS3ZfNyJ9fQ.eyJleHAiOjE2NTU4MjA5OTMsImh0dHA6Ly9saWNlbnNlLW1hbmFnZXIuaGFybW9uLmllL2FsbC9yZWFkP2RvbWFpbnM9aGFybW9uLmllIjp0cnVlLCJwcm92aWRlciI6InplbmRlc2siLCJ1aWQiOiIzOTIyNzEyNTA2NzEiLCJ1c2VybmFtZSI6InZhZGltIChtYWluc29mdCkifQ.AbOYcOmvTl0Y__KrvmzNMBVCNx7uz2zqaQkDx2KHgwOugzyS0eHd-CiWOsRiWtnrvx1Vm0AtkZLFFxLRcMELHAAlACzDXUm5K6kBo5XwkSChDx14UO54L1qcvPRiwL3o2uEW03Yszh7jtopT08q1AFruscZeaE2oWy0e4hMRNjoyhKz5'
      }
    })
    const text = await response.text()
    const el = text.split(']]}')[0]
    const jsonRespBody = JSON.parse(el + ']]}')

    const { rows, columns, count } = jsonRespBody;
    const users = rows.map(item => {
      const user = {};
      item.forEach((value, index) => {
        if (/[a-z]/gim.test(columns[index])) {
          user[columns[index]] = value
        }
      });
      return user;
    }).filter(item => item.build_version || item.product_name)
    const perPage = 10;

    if (Math.ceil(count[""] / perPage) < +router.query?.page) {
      addParams([
        { key: 'page', value: Math.ceil(count[""] / perPage) },
      ]);
      return;
    }
    setPagesInfo([
      {
        maxPage: Math.ceil(count[""] / perPage),
        total: count[""],
        perPage: perPage,
      },
    ]);

    setUsersList(users);
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

  const handleSelectAll = async (e) => {
    if (isSelectedAll) {
      setCheckedUsersList([]);
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
          token={token}
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
