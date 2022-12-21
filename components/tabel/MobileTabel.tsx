import React from 'react';

import { Paper } from '../paper/Paper';
import { UserType } from '../../types';
import { Button } from '../buttons/Button';
import { Checkbox } from '../checkbox/Checkbox';

export type MobileTabelProps = {
  items: UserType[];
  handleSelectAllOnPage: (e: any) => void;
  isCheckAll: boolean;
  pageNumber: number;
  decrementPage: () => void;
  incrementPage: () => void;
  pagesInfo: { total: number; maxPage: number; perPage: number }[];
  getLastShowedResultNumber: () => number;
  children: any;
};

export const MobileTabel = ({
  items,
  handleSelectAllOnPage,
  isCheckAll,
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
              <div className="flex items-center p-2">
                <Checkbox
                  id={'selectAll'}
                  handelCheckbox={handleSelectAllOnPage}
                  checked={isCheckAll}
                />
              </div>
            </div>
            <div>{children}</div>

            {items.length > 0 && pagesInfo[0].maxPage > 0 && (
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
