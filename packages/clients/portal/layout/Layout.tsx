import cx from 'classnames';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { defaultMenuItems } from './LayoutOptions';
import { useIsAuthenticated } from '@azure/msal-react';
import { Spinner } from '../components/loaders/Spinner';
import { NavMemo as Nav } from './Nav/Nav';
import { BREAKPOINTS, useBreakpoint } from '../hooks/useBreakpoint';

export type CardProps = {
  children: React.ReactElement | React.ReactNode;
};

export const Layout = ({ children }: CardProps) => {
  const [isNavigation, setIsNavigation] = useState(false);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [isLoading, setIsLoading] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  const router = useRouter();
  const { inProgress } = useMsal();
  const { screenWidth } = useBreakpoint();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = screenWidth < BREAKPOINTS.lg;
  const token = Cookies.get('download-token');

  useEffect(() => {
    setIsLoading(true);
    const getMenuItems = async () => {
      const res = await fetch('/api/sanity-data');
      const body = await res.json();
      const allMenuItems = [...menuItems]
      if (body.links) {
        body.links.forEach(item => {
          const isUnique = allMenuItems.findIndex(link => link.external === item.external && link.label === item.label) === -1
          if (isUnique) {
            allMenuItems.push(item);
          }
        })
      }
      const activeItem = allMenuItems.find(item => `/portal${item.external}` === router.asPath);
      if (activeItem) {
        const isNestedPage = defaultMenuItems.findIndex(item => item.external === activeItem.external) === -1;
        setIsIframe(isNestedPage);
        setIsNavigation(activeItem.isSideMenu)
      }
      setMenuItems(allMenuItems);
      setIsLoading(false);
    }
    getMenuItems();
  }, [])

  useEffect(() => {
    if (!isAuthenticated && inProgress === 'none' && !token) {
      router.push('/');
    }
  });

  if (inProgress !== 'none' || isLoading) {
    return (
      <div className="w-24 h-24 m-auto mt-24">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated && !token) return null;

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
          {/* {icon && <Icon name={icon} className="w-6 h-6 " />} */}
          {label}
        </div>
      </button>
    ));

  return (
    <div className="lg:h-screen overflow-hidden grid grid-rows-[62px_1fr] lg:grid-rows-[92px_1fr]">
      {
        isNavigation ? (
          <>
            <Nav menuItems={menuItems} />
            <div className="grid grid-cols-1 overflow-y-scroll lg:overflow-hidden lg:grid-cols-[22.229vw_1fr]">
              {!isMobile && (
                <div className="bg-gray-50 lg:pt-4">{renderMenuList(menuItems)}</div>
              )}
              <div
                className={cx('h-[94vh] 0 overflow-auto lg:h-[91vh] lg:pb-0 text-indigo-500', {
                  ['py-8 px-4 lg:pl-20 lg:pr-14 lg:pt-12']: !isIframe,
                })}
              >
                {children}
              </div>
            </div>
          </>
        ) : (
          <>
            <Nav menuItems={menuItems} />
            <div className="h-[94vh] overflow-auto text-indigo-500">
              {children}
            </div> 
          </>
        )
      }
    </div>
  );
};

export const LayoutMemo = React.memo(Layout);
