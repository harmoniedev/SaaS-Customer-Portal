import React from 'react';

import { pick } from '../../helpers/utils/object';
import { SIZES } from '../../types';

export const SIZE_OPTIONS = pick(SIZES, 'none', 'xs', 'sm', 'md', 'lg');

export type SizeType = keyof typeof SIZE_OPTIONS;

export type SpacingProps = {
  space: SizeType;
  children?: React.ReactElement | React.ReactNode;
};

const spaceClasses: Record<SizeType, string> = {
  none: '',
  xs: 'py-4 sm:py-8',
  sm: 'py-4 sm:py-8 md:py-12 lg:py-16',
  md: 'py-10 sm:py-12 md:py-16 lg:py-20',
  lg: 'py-12 sm:py-16 md:py-20 lg:py-24',
};

export const Spacing = ({ space = 'md', children }: SpacingProps) => {
  return <div className={spaceClasses[space]}>{children}</div>;
};

export const SpacingMemo = React.memo(Spacing);
