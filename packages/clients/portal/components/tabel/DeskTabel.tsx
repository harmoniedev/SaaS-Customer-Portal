import React from 'react';
import cx from 'classnames';

import { Icon } from '../icons/Icon';
import { UserType } from '../../types';
import { Button } from '../buttons/Button';
import { ParamsListType } from '../../types';
import { tableHeaders } from './TabelOptions';

export type DeskTabelProps = {
  sortBy: string;
  setSort: (value: ParamsListType[]) => void;
  items: UserType[];
  handleSelectAll: (e: any) => void;
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
};

export const DeskTabel = ({
  setSort,
  items,
  handleSelectAll,
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
              <th scope="col" className="px-5">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    name="selectAll"
                    id="selectAll"
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                  />
                </div>
              </th>
              {tableHeaders?.map(({ id, name }) => (
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
        {items?.length > 0 && pagesInfo[0]?.maxPage > 0 && (
          <div className="py-3 px-6 bg-white shadow-md border-b">
            <div className="flex justify-between items-center">
              <p>
                Showing {pageNumber * pagesInfo[0].perPage + 1} to{' '}
                {getLastShowedResultNumber()} of {pagesInfo[0].total} results
              </p>
              <div className="flex gap-3">
                {checkedList?.length > 0 && (
                  <Button
                    theme="white"
                    as="button"
                    onClick={() => {
                      setModalNameOpen('deleteAll');
                      setIsModuleOpen(true);
                    }}
                    label="Delete Users"
                  />
                )}
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
