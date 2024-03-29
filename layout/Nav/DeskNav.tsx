import React from 'react';
import Cookies from 'js-cookie'
import { Icon } from '../../components/icons/Icon';
import { useRouter } from 'next/router';
import {parseJWT} from "../../helpers/utils/jwt";
import { urlParams } from '../../pages';

export type DeskNavProps = {
  showUserMenu: boolean;
  open: boolean;
  onClickMenu: (e: any) => void;
};

export const DeskNav = ({ showUserMenu, open, onClickMenu }: DeskNavProps) => {
  const router = useRouter();
  const msToken = Cookies.get('token');

  return (
    showUserMenu && (
      <div className="flex items-center ml-auto mr-10">
        <div>
          <Icon className="w-10 h-10 text-blue-500 " name="UserCircleBlue" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 text-indigo-500 cursor-pointer"
          onClick={onClickMenu}
        >
          <p>{msToken && parseJWT((Cookies.get('token'))).username}</p>
          {open ? (
            <Icon name="ChevronUpIcon" className="w-4 h-4" />
          ) : (
            <Icon name="ChevronDownIcon" className="w-4 h-4" />
          )}
        </div>
        {open && (
          <div className="fixed z-50 top-20 right-10 shadow-[0_4px_20px_rgba(0,0,0,0.25)] w-72">
            <div
              className="bg-white p-8 flex items-center justify-items-start justify-start gap-5 text-indigo-500 font-medium cursor-pointer"
              onClick={() => {
                if (msToken) {
                  Cookies.remove('token');
                  urlParams == null
                  router.push('/')
                }
              }}
            >
              <Icon name="LogoutIcon" className="w-8 h-8 text-indigo-200" />
              Sign Out
            </div>
          </div>
        )}
      </div>
    )
  );
};

export const DeskNavMemo = React.memo(DeskNav);
