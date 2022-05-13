import React, { useState } from 'react';
import NextLink from 'next/link';
import cx from 'classnames';

import { BREAKPOINTS, useBreakpoint } from '../../hooks/useBreakpoint';

import LogoImageMobile from '../../public/logo-icon.svg';
import LogoImage from '../../public/logo.svg';

import { DeskNavMemo as DeskNav } from './DeskNav';
import { MobileNavMemo as MobileNav } from './MobileNav';
import { TitleMemo as Title } from '../../components/title/Title';

export type NavProps = {
  showUserMenu?: boolean;
};
export const Nav = ({ showUserMenu = true }: NavProps) => {
  const { screenWidth } = useBreakpoint();
  const [openDesckMenu, setOpenDesckMenu] = useState(false);
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);
  const isMobile = screenWidth < BREAKPOINTS.lg;

  const onHamburgerClick = (value) => {
    setMobileNavIsOpen(value);
  };

  const toggleDeskMenu = () => {
    setOpenDesckMenu(!openDesckMenu);
  };

  return (
    <div className="px-2 md:px-4">
      <nav
        className={cx(
          'flex gap-3 items-center h-full my-auto px-1 border-b-2 border-indigo-50',
        )}
      >
        <NextLink href="/">
          <a>{isMobile ? <LogoImageMobile className="w-7 h-7" /> : <LogoImage />}</a>
        </NextLink>
        <Title className="text-indigo-200" size="xs">
          Customer Portal
        </Title>
        {isMobile ? (
          <MobileNav
            open={mobileNavIsOpen}
            onHamburgerClick={onHamburgerClick}
            showUserMenu={showUserMenu}
          />
        ) : (
          <DeskNav
            showUserMenu={showUserMenu}
            open={openDesckMenu}
            onClickMenu={toggleDeskMenu}
          />
        )}
      </nav>
    </div>
  );
};

export const NavMemo = React.memo(Nav);
