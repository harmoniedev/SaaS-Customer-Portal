import React from 'react';

import { Paper } from '../paper/Paper';
import { UserType } from '../../types';
import { Button } from '../buttons/Button';
import { Icon } from '../icons/Icon';
import { Dropdown } from '../dropdown/Dropdown';

export type MobileTabelProps = {
  items: UserType[];
  handleSelectAllOnPage: (e: any) => void;
  isCheckAll: boolean;
  checkedList: string[];
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalNameOpen: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  decrementPage: () => void;
  incrementPage: () => void;
  pagesInfo: { total: number; maxPage: number; perPage: number }[];
  getLastShowedResultNumber: () => number;
  setSort: () => string;
  children: any;
  listSelectedCheckBoxes: any;
  handelCheckType: any;
  isSelectedBtnOpen: boolean;
  setIsSelectedBtnOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileTabel = ({
  items,
  setIsModuleOpen,
  setModalNameOpen,
  handleSelectAllOnPage,
  isCheckAll,
  checkedList,
  pageNumber,
  decrementPage,
  incrementPage,
  pagesInfo,
  getLastShowedResultNumber,
  children,
  setSort,
  listSelectedCheckBoxes,
  handelCheckType,
  isSelectedBtnOpen,
  setIsSelectedBtnOpen,
}) => {
  return (
    <div>
      <Paper>
        <div className="shadow-md">
          <div className="w-full text-left text-indigo-400">
            <div className="text-xs font-normal text-indigo-400 uppercase bg-gray-200">
              <div className="flex gap-2 items-center p-2">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  className="w-6 h-6 text-indigo-300 bg-gray-100 border-gray-300 rounded focus:ring-indigo-300 focus:ring-2"
                  onChange={handleSelectAllOnPage}
                  checked={isCheckAll}
                />
                <div onClick={(e) => setIsSelectedBtnOpen(!isSelectedBtnOpen)}>
                  <Icon name="ChevronDownIcon" className="w-6 h-6" />
                </div>
              </div>
            </div>
            {isSelectedBtnOpen && (
              <Dropdown>
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
