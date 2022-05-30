import React from 'react';

import { Paper } from '../paper/Paper';
import { UserType } from '../../types';
import { Button } from '../buttons/Button';

export type MobileTabelProps = {
  items: UserType[];
  handleSelectAll: (e: any) => void;
  isCheckAll: boolean;
  checkedList: string[];
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalNameOpen: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  decrementPage: () => void;
  incrementPage: () => void;
  pagesInfo: { total: number; maxPage: number; perPage: number }[];
  getLastShowedResultNumber: () => number;
  children: any;
};

export const MobileTabel = ({
  items,
  setIsModuleOpen,
  setModalNameOpen,
  handleSelectAll,
  isCheckAll,
  checkedList,
  pageNumber,
  decrementPage,
  incrementPage,
  pagesInfo,
  getLastShowedResultNumber,
  children,
}) => {
  return (
    <div>
      <Paper>
        <div className="shadow-md">
          <div className="w-full text-left text-indigo-400">
            <div className="text-xs font-normal text-indigo-400 uppercase bg-gray-200">
              <div className="flex gap-4 items-center p-2">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  onChange={handleSelectAll}
                  checked={isCheckAll}
                />
                {checkedList?.length > 0 && (
                  <div
                    className="p-1 cursor-pointer focus:text-blue-500"
                    onClick={() => {
                      setModalNameOpen('deleteAll');
                      setIsModuleOpen(true);
                    }}
                  >
                    <p className="text-indigo-500 font-medium">Delete Users</p>
                  </div>
                )}
              </div>
            </div>
            <div>{children}</div>

            {items?.length > 0 && pagesInfo[0].maxPage > 0 && (
              <div className="px-2 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-indigo-500 font-medium">
                    Showing {pageNumber * pagesInfo[0].perPage + 1} to{' '}
                    {getLastShowedResultNumber()} of {pagesInfo[0].total} results
                  </p>
                  <div className="flex gap-3">
                    <Button
                      icon="ChevronLeftIcon"
                      theme="white"
                      onClick={decrementPage}
                      as="button"
                      disabled={pageNumber < 1}
                    />
                    <Button
                      icon="ChevronRightIcon"
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
      </Paper>
    </div>
  );
};

export const MobileTabelMemo = React.memo(MobileTabel);
