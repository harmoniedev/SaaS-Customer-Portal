import cx from 'classnames';
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { menuItems } from './LayoutOptions';
import { useIsAuthenticated } from '@azure/msal-react';
import { Icon } from '../components/icons/Icon';
import { Spinner } from '../components/loaders/Spinner';
import { NavMemo as Nav } from './Nav/Nav';
import { BREAKPOINTS, useBreakpoint } from '../hooks/useBreakpoint';

export type CardProps = {
  children: React.ReactElement | React.ReactNode;
};

export const Layout = ({ children }: CardProps) => {
  const router = useRouter();
  const { inProgress } = useMsal();
  const { screenWidth } = useBreakpoint();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = screenWidth < BREAKPOINTS.lg;

  useEffect(() => {
    if (!isAuthenticated && inProgress === 'none') {
      router.push('/');
    }
  });

  if (inProgress !== 'none') {
    return (
      <div className="w-24 h-24 m-auto mt-24">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) return null;

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
    <div className="lg:h-screen overflow-hidden grid grid-rows-[62px_1fr] lg:grid-rows-[92px_1fr]">
      <Nav />
      <div className="grid grid-cols-1 overflow-y-scroll lg:overflow-hidden lg:grid-cols-[22.229vw_1fr]">
        {!isMobile && (
          <div className="bg-gray-50 lg:pt-4">{renderMenuList(menuItems)}</div>
        )}
        <div className="h-[94vh] py-8 px-4 lg:pl-20 lg:pr-14 lg:pt-10 overflow-auto lg:h-[91vh] lg:pb-0 text-indigo-500">
          {children}
        </div>
      </div>
    </div>
  );
};

export const LayoutMemo = React.memo(Layout);
