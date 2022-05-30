import React from 'react';
import cx from 'classnames';

import { Icon } from '../icons/Icon';
import { UserType } from '../../types';
import { Button } from '../buttons/Button';
import { ParamsListType } from '../../types';
import { tableHeaders } from './TabelOptions';
import { Dropdown } from '../dropdown/Dropdown';

export type DeskTabelProps = {
  sortBy: string;
  setSort: (value: ParamsListType[]) => void;
  items: UserType[];
  handleSelectAllOnPage: (e: any) => void;
  isCheckAll: boolean;
  checkedList: string[];
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalNameOpen: React.Dispatch<React.SetStateAction<string>>;
  sortedFrom: string;
  setSortedFrom: (value: string) => void;
  pageNumber: number;
  decrementPage: () => void;
  incrementPage: () => void;
  pagesInfo: { total: number; maxPage: number; perPage: number }[];
  getLastShowedResultNumber: () => number;
  children: any;
  listSelectedCheckBoxes: any;
  handelCheckType: any;
  isSelectedBtnOpen: boolean;
  setIsSelectedBtnOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeskTabel = ({
  setSort,
  items,
  handleSelectAllOnPage,
  isCheckAll,
  checkedList,
  setIsModuleOpen,
  setModalNameOpen,
  sortedFrom,
  setSortedFrom,
  pageNumber,
  decrementPage,
  incrementPage,
  pagesInfo,
  getLastShowedResultNumber,
  sortBy,
  children,
  listSelectedCheckBoxes,
  handelCheckType,
  isSelectedBtnOpen,
  setIsSelectedBtnOpen,
}: DeskTabelProps) => {
  const handelSortBtn = (id) => {
    if (id === sortBy) {
      sortedFrom === 'desc' ? setSortedFrom('asc') : setSortedFrom('desc');
    } else {
      setSort([
        { key: 'direction', value: 'asc' },
        { key: 'sortBy', value: id },
      ]);
    }
  };

  return (
    <div className="flex gap-5 flex-col mb-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead className="uppercase bg-gray-200">
            <tr>
              <th scope="col" className="pl-5">
                <div className="flex items-center">
                  {isSelectedBtnOpen && (
                    <Dropdown position="top-10">
                      {listSelectedCheckBoxes.map(({ slug, title }, idx) => (
                        <button
                          key={idx}
                          type="button"
                          id={slug}
                          onClick={handelCheckType}
                          className="border-b py-2.5 text-base"
                        >
                          {title}
                        </button>
                      ))}
                    </Dropdown>
                  )}
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-indigo-300 bg-gray-100 border-gray-300 rounded focus:ring-indigo-300 focus:ring-2 mr-2"
                      name="selectAll"
                      id="selectAll"
                      onChange={handleSelectAllOnPage}
                      checked={isCheckAll}
                    />
                    {/* <div
                      className="absolute top-0  flex items-center"
                      onChange={handleSelectAllOnPage}
                    >
                      <Icon name="Subtract" className="w-6 h-6 text-indigo-300" />
                    </div> */}
                  </div>

                  <div onClick={() => setIsSelectedBtnOpen(!isSelectedBtnOpen)}>
                    <Icon name="ChevronDownIcon" className="w-6 h-6" />
                  </div>
                </div>
              </th>
              {tableHeaders.map(({ id, name }) => (
                <th
                  key={id}
                  scope="col"
                  className={cx('py-3 cursor-pointer', {
                    ['pr-8']: id !== sortBy,
                    ['pl-3']: id === 'name',
                  })}
                  onClick={() => handelSortBtn(id)}
                >
                  <div className="flex items-center gap-2">
                    <p>{name.toUpperCase()}</p>
                    {id === sortBy && (
                      <Icon
                        name={
                          sortedFrom === 'desc' ? 'ChevronUpIcon' : 'ChevronDownIcon'
                        }
                        className="w-6 h-6"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
        {items.length > 0 && pagesInfo[0].maxPage > 0 && (
          <div className="py-3 px-6 bg-white shadow-md border-b">
            <div className="flex justify-between items-center">
              <p>
                Showing {pageNumber * pagesInfo[0].perPage + 1} to{' '}
                {getLastShowedResultNumber()} of {pagesInfo[0].total} results
              </p>
              <div className="flex gap-3">
                <Button
                  theme="white"
                  onClick={decrementPage}
                  as="button"
                  label="Previous"
                  disabled={pageNumber < 1}
                />
                <Button
                  label="Next"
                  theme="white"
                  onClick={incrementPage}
                  as="button"
                  disabled={pageNumber > pagesInfo[0].maxPage - 2}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const DeskTabelMemo = React.memo(DeskTabel);
