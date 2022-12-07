import cx from 'classnames';
import React from 'react';

import { pick } from '../../helpers/utils/object';
import { SIZES, TextElement, FONT_WEIGHTS } from '../../types';

export const SIZE_OPTIONS = pick(SIZES, 'xxl', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl');
export type SizeType = keyof typeof SIZE_OPTIONS;

export const WEIGHT_OPTIONS = pick(FONT_WEIGHTS, 'bold', 'extrabold');
export type WeightType = keyof typeof WEIGHT_OPTIONS;

export type TitleProps = {
  children: React.ReactElement | React.ReactNode;
  as?: TextElement;
  size?: SizeType;
  weight?: WeightType;
  className?: string;
};

const sizeClasses: Record<SizeType, string> = {
  xxs: 'text-base',
  xs: 'text-xl',
  sm: 'text-xl md:text-xl lg:text-2xl',
  md: 'text-xl md:text-2xl lg:text-3xl',
  lg: 'text-2xl md:text-3xl lg:text-4xl lg:leading-tight',
  xl: 'text-4xl sm:text-5xl md:leading-mini',
  xxl: 'text-5xl sm:text-6xl md:leading-mini',
};

const weightClasses: Record<WeightType, string> = {
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

export const Title = ({
  children,
  as = 'h2',
  size = 'lg',
  weight = 'bold',
  className,
}: TitleProps) => {
  const Element = as;
  return (
    <Element
      className={cx(
        'break-words max-w-title inline-block',
        sizeClasses[size],
        weightClasses[weight],
        className,
      )}
    >
      {children}
    </Element>
  );
};

export const TitleMemo = React.memo(Title);
