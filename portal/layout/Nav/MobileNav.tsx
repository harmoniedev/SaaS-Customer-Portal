import React from 'react';
import cx from 'classnames';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';

import { Button } from '../../components/buttons/Button';
import { SizeType } from '../../components/buttons/ButtonOptions';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { FullScreenModalMemo as FullScreenModal } from '../../components/modals/FullScreenModal';
import { Icon } from '../../components/icons/Icon';
import { MenuItem } from '../../types';

const responsiveButtonSizes: { [key: string]: SizeType } = {
  md: 'sm',
  lg: 'sm',
  xl: 'md',
  '2xl': 'lg',
};
export type MobileNavProps = {
  showUserMenu: boolean;
  onHamburgerClick: (e: any) => void;
  open: boolean;
  menuItems: MenuItem[]
};

export const MobileNav = ({
  showUserMenu = true,
  onHamburgerClick,
  open,
  menuItems
}: MobileNavProps) => {
  const router = useRouter();
  const { breakpoint } = useBreakpoint();
  const responsiveButtonSize: SizeType = responsiveButtonSizes[breakpoint];
  const msToken = Cookies.get('token');

  const parseJwt = (key, cookieName) => {
    try {
      const parsed = JSON.parse(atob(Cookies.get(cookieName).split('.')[1]));
      const name = parsed ? parsed[key] : '';
      return name
    } catch (e) {
      return '';
    }
  };

  const renderMenuList = (items) =>
    items.map(({ label, icon, external }, i) => (
      <button
        key={i}
        onClick={() => router.push(`/portal${external}`)}
        className={cx('py-4 px-12 text-indigo-500 w-full font-semibold', {
          ['bg-indigo-50']: `/portal${external}` === router.pathname,
        })}
      >
        <div className="flex gap-4">
          {icon && <Icon name={icon} className="w-6 h-6 " />}
          {label}
        </div>
      </button>
    ));

  return (
    showUserMenu && (
      <div className="ml-auto">
        <div className="border">
          <Button
            label=""
            ariaLabel="Open navigation"
            icon="MenuIcon"
            onClick={onHamburgerClick}
            size={responsiveButtonSize}
            theme="white"
          />
        </div>
        {open && (
          <FullScreenModal handleOutsideClick={onHamburgerClick}>
            {renderMenuList(menuItems)}
            <div className="border-t">
              <div className="flex py-4 px-12 gap-2">
                <div className="flex">
                  <Icon
                    className="w-10 h-10 text-blue-500 font-semibold"
                    name="UserCircleBlue"
                  />
                </div>
                <div>
                  <p className="font-medium">{msToken && parseJwt('username', 'token')}</p>
                </div>
              </div>
              <div
                className="flex gap-2 py-4 px-12 text-indigo-500 w-full"
                onClick={() => {
                  if (msToken) {
                    Cookies.remove('token');
                    router.push('/')
                  }
                }}
              >
                <Icon name="LogoutIcon" className="w-8 h-8 text-indigo-200" />
                <p>Sign out</p>
              </div>
            </div>
          </FullScreenModal>
        )}
      </div>
    )
  );
};

export const MobileNavMemo = React.memo(MobileNav);
