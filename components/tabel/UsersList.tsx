import React, { useState } from 'react';

import { Icon } from '../icons/Icon';
import { formatDate } from '../../helpers/utils/date';
import { truncate } from '../../helpers/utils/string';
import { UserType } from '../../types';
import { Checkbox } from '../checkbox/Checkbox';

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

export const UsersList = ({
  items,
  setActiveUser,
  setIsModuleOpen,
  setModalNameOpen,
  handelCheckbox,
  activeUser,
  checkedList,
  isMobile,
}: UsersListSceneProps) =>
{
  const [isOpen, setIsOpen] = useState([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handelOpenItem = (e) =>
  {
    const { id } = e.currentTarget;
    const { type } = e.target;

    if (type === 'checkbox') return;

    if (isOpen.includes(id))
    {
      setIsOpen(isOpen.filter((item) => item !== id));
      return;
    }
    setIsOpen([...isOpen, id]);
  };

  const trElement = (items) =>
    items.map(({ email, build_version, last_date, first_date, product_name }, i) =>
    {
      return (
        <tr
          key={i}
          className="bg-white border-bhover:bg-blue-50"
          onMouseOver={() =>
          {
            setActiveUser(email);
            setShowMenu(true);
          }}
          onMouseOut={() =>
          {
            setShowMenu(false);
          }}
        >
          <td className="w-4 p-5">
            <div className="flex items-center">
              <Checkbox
                id={email}
                handelCheckbox={handelCheckbox}
                checked={checkedList.includes(email)}
              />
            </div>
          </td>
          <th scope="row" className="whitespace-nowrap">
            <div className="flex items-center gap-4">
              <Icon name="UserCircleBlue" className="w-10 h-10" />
              <p className="text-indigo-300 font-normal">{email}</p>
            </div>
          </th>
          <td className="text-indigo-300">{product_name}</td>
          <td className="text-indigo-300">{truncate(build_version, 20)}</td>
          <td className="text-indigo-300">{formatDate(first_date)}</td>
          <td className="text-indigo-300 cursor-pointer md:w-24 lg:w-28">
              <p className="pr-4">{formatDate(last_date)}</p>
          </td>
        </tr>
      );
    });

  const trMobileElment = (items) =>
    items.slice(0, 1000).map(({ email, build_version, last_date, first_date, product_name }, i) =>
    {

      return (
        <div key={i} className="border-b">
          <div
            id={email}
            className="w-full bg-white flex gap-2.5 content-center items-center px-2"
            onClick={(e) =>
            {
              setActiveUser(email);
              handelOpenItem(e);
            }}
          >
            <div>
              <Checkbox
                id={email}
                handelCheckbox={handelCheckbox}
                checked={checkedList.includes(email)}
              />
            </div>
            <div className="py-2 flex flex-col items-center gap-4 w-full max-w-full overflow-hidden">
              <div className="flex flex-rows items-center gap-4 w-full max-w-full">
                <Icon name="UserCircleBlue" className="w-8 h-8 shrink-0" />
                {/* <div className="flex flex-col w-[calc(100%-4rem)]"> */}
                <div className="break-words text-indigo-300 font-normal w-full max-w-full">
                  {email}
                </div>
                {/* </div> */}
              </div>
            </div>

            <div className="ml-auto">
              {isOpen.includes(email) ? (
                <Icon name="ChevronUpIcon" className="w-6 h-6" />
              ) : (
                <Icon name="ChevronDownIcon" className="w-6 h-6" />
              )}
            </div>
          </div>

          {isOpen.includes(email) && (
            <div className="px-12 flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Product Name:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {product_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Build Version:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {build_version}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Last Active:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {formatDate(first_date)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Role:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {formatDate(last_date)}
                </p>
              </div>
              <div className="flex justify-end gap-2.5 p-1.5 border-t">
                <div
                  onClick={() =>
                  {
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
    });
  return isMobile ? trMobileElment(items) : trElement(items);
};

export const UsersListMemo = React.memo(UsersList);
