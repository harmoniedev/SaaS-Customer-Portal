import React from 'react';
import cx from 'classnames';
import { useMsal } from '@azure/msal-react';
import { useRouter } from 'next/router';

import { Button } from '../../components/buttons/Button';
import { SizeType } from '../../components/buttons/ButtonOptions';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { FullScreenModalMemo as FullScreenModal } from '../../components/modals/FullScreenModal';
import { menuItems } from '../LayoutOptions';
import { Icon } from '../../components/icons/Icon';

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
};

export const MobileNav = ({
  showUserMenu = true,
  onHamburgerClick,
  open,
}: MobileNavProps) => {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  const { breakpoint } = useBreakpoint();
  const responsiveButtonSize: SizeType = responsiveButtonSizes[breakpoint];

  const renderMenuList = (items) =>
    items?.map(({ title, icon, id }, i) => (
      <button
        key={i}
        onClick={() => router.push(`/portal/${id}`)}
        className={cx('py-4 px-12 text-indigo-500 w-full font-semibold', {
          ['bg-indigo-50']: `/portal/${id}` === router.pathname,
        })}
      >
        <div className="flex gap-4">
          {icon && <Icon name={icon} className="w-6 h-6 " />}
          {title}
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
                  <p className="font-medium">{accounts[0]?.name}</p>
                  <p className="text-indigo-300">{accounts[0]?.username}</p>
                </div>
              </div>
              <div
                className="flex gap-2 py-4 px-12 text-indigo-500 w-full"
                onClick={() => instance.logout()}
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
