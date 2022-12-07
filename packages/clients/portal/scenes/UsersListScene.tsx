import React, { useCallback, useState } from 'react';

import { Icon } from '../components/icons/Icon';
import { formatDate } from '../helpers/utils/date';
import { truncate } from '../helpers/utils/string';
import { UserType } from '../types';

export type UsersListSceneProps = {
  items: UserType[];
  setActiveUser: React.Dispatch<React.SetStateAction<string>>;
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalNameOpen: React.Dispatch<React.SetStateAction<string>>;
  handelCheckbox: (e: any) => void;
  activeUser: string;
  checkedList: string[];
  isMobile: boolean;
};

export const UsersListScene = ({
  items,
  setActiveUser,
  setIsModuleOpen,
  setModalNameOpen,
  handelCheckbox,
  activeUser,
  checkedList,
  isMobile,
}: UsersListSceneProps) => {
  const [isOpen, setIsOpen] = useState([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handelOpenItem = (e) => {
    const { id } = e.currentTarget;
    const { type } = e.target;

    if (type === 'checkbox') return;

    if (isOpen.includes(id)) {
      setIsOpen(isOpen.filter((item) => item !== id));
      return;
    }
    setIsOpen([...isOpen, id]);
  };

  const trElement = (items: any[]) =>
    items?.map(({ license, email, role, name, lastActiveDate, _id }, i) => {
      return (
        <tr
          key={i}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
          onMouseOver={() => {
            setActiveUser(_id);
            setShowMenu(true);
          }}
          onMouseOut={() => {
            setShowMenu(false);
          }}
        >
          <td className="w-4 p-5">
            <div className="flex items-center">
              <input
                id={_id}
                type="checkbox"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handelCheckbox}
                checked={checkedList.includes(_id)}
              />
              <label className="sr-only">checkbox</label>
            </div>
          </td>
          <th scope="row" className="whitespace-nowrap">
            <div className="flex items-center gap-4">
              <Icon name="UserCircleBlue" className="w-10 h-10" />
              <div>
                <p>{name}</p>
                <p className="text-indigo-300 font-normal">{email}</p>
              </div>
            </div>
          </th>
          <td className="text-indigo-300">{license}</td>
          <td className="text-indigo-300">{formatDate(lastActiveDate) || 'N/A'}</td>
          <td className="text-indigo-300 cursor-pointer md:w-24 lg:w-28">
            {showMenu && activeUser === _id ? (
              <div className="flex justify-around ">
                <div
                  onClick={() => {
                    setIsModuleOpen(true);
                    setModalNameOpen('edit');
                  }}
                >
                  <Icon name="PencilIcon" className="w-6 h-6 text-blue-500" />
                </div>
                <div
                  onClick={() => {
                    setIsModuleOpen(true);
                    setModalNameOpen('delete');
                  }}
                >
                  <Icon name="TrashIcon" className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            ) : (
              <p className="pr-4">{truncate(role, 15)}</p>
            )}
          </td>
        </tr>
      );
    });

  const trMobileElment = (items) =>
    items?.map(({ license, email, role, name, lastActiveDate, _id }, i) => {
      return (
        <div key={i} className="border-b">
          <div
            id={_id}
            className="w-full bg-white flex gap-2.5 content-center items-center px-2"
            onClick={(e) => {
              setActiveUser(_id);
              handelOpenItem(e);
            }}
          >
            <div>
              <input
                type="checkbox"
                id={_id}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handelCheckbox}
                checked={checkedList.includes(_id)}
              />
            </div>
            <div className="py-2 flex flex-col items-center gap-4 w-full max-w-full overflow-hidden">
              <div className="flex flex-rows items-center gap-4 w-full max-w-full">
                <Icon name="UserCircleBlue" className="w-8 h-8 shrink-0" />
                <div className="flex flex-col w-[calc(100%-4rem)]">
                  <p className="text-indigo-500  font-medium">{name}</p>
                  <div className="break-words text-indigo-300 font-normal w-full max-w-full">
                    {email}
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              {isOpen.includes(_id) ? (
                <Icon name="ChevronUpIcon" className="w-6 h-6" />
              ) : (
                <Icon name="ChevronDownIcon" className="w-6 h-6" />
              )}
            </div>
          </div>

          {isOpen.includes(_id) && (
            <div className="px-12 flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">License:</p>
                <p className="text-indigo-500 font-medium text-right">{license}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Last Active:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {formatDate(lastActiveDate) || 'N/A'}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Role:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {truncate(role, 20)}
                </p>
              </div>
              <div className="flex justify-end gap-2.5 p-1.5 border-t">
                <div
                  onClick={() => {
                    setIsModuleOpen(true);
                    setModalNameOpen('edit');
                  }}
                >
                  <Icon name="PencilIcon" className="w-6 h-6 text-indigo-100" />
                </div>
                <div
                  onClick={() => {
                    setIsModuleOpen(true);
                    setModalNameOpen('delete');
                  }}
                >
                  <Icon name="TrashIcon" className="w-6 h-6 text-indigo-100" />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }) || [];
  return isMobile ? trMobileElment(items) : trElement(items);
};

export const UsersListSceneMemo = React.memo(UsersListScene);
