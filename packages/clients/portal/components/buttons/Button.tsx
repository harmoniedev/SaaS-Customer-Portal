import cx from 'classnames';
import React from 'react';

import { isInternalLink } from '../../helpers/utils/isInternalLink';
import { Icon } from '../icons/Icon';
import { IconName } from '../icons/Icons';
import { Spinner } from '../loaders/Spinner';
import { AlignType, ColorType, SizeType, IconPositionType } from './ButtonOptions';
import { Link } from './Link';

export type ButtonProps = {
  align?: AlignType;
  ariaLabel?: string;
  as?: 'button' | 'a' | 'div' | 'span' | 'submit';
  compact?: boolean;
  current?: boolean;
  href?: string;
  icon?: IconName;
  iconPosition?: IconPositionType;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  plain?: boolean;
  round?: boolean;
  medium?: boolean;
  size?: SizeType;
  stretch?: boolean;
  target?: string;
  theme?: ColorType;
  disabled?: boolean;
  loading?: boolean;
  download?: boolean;
};

const bgClasses: Record<ColorType, string> = {
  blue: 'bg-blue-500 hover:bg-blue-700 focus:bg-blue-600 border-transparent',
  lightblue: 'bg-blue-50 hover:bg-blue-100 focus:bg-blue-50 border-transparent',
  white: 'bg-white hover:bg-gray-50 focus:bg-white border-indigo-50',
  red: 'bg-red-500 hover:bg-red-700 focus:bg-red-600 border-transparent',
  green: 'bg-green-500 hover:bg-green-700 focus:bg-green-600 border-transparent',
  yellow: 'bg-yellow-500 hover:bg-yellow-700 focus:bg-yellow-600 border-transparent',
  indigo: 'bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-600 border-transparent',
  darkblue: 'bg-blue-700 hover:bg-blue-900 focus:bg-blue-800 border-transparent',
  gray: 'bg-gray-700 hover:bg-gray-900 focus:bg-gray-800 border-transparent',
  lightindigo:
    'bg-indigo-100 hover:bg-blue-500 hover:bg-blue-500 border-transparent',
};

const bgCurrentClasses: Record<ColorType, string> = {
  blue: 'bg-blue-600',
  lightblue: 'bg-blue-50',
  white: 'bg-white',
  red: 'bg-red-600',
  green: 'bg-green-600',
  yellow: 'bg-yellow-600',
  indigo: 'bg-indigo-600',
  darkblue: 'bg-blue-800',
  gray: 'bg-gray-800',
  lightindigo: 'bg-indigo-100',
};

const textColorClasses: Record<ColorType, string> = {
  blue: 'text-white',
  lightblue: 'text-indigo-500',
  white: 'text-indigo-500',
  red: 'text-white',
  green: 'text-white',
  yellow: 'text-white',
  indigo: 'text-white',
  darkblue: 'text-white',
  gray: 'text-white',
  lightindigo: 'text-white',
};

const textColorCurrentClasses: Record<ColorType, string> = {
  blue: 'text-white',
  lightblue: 'text-indigo-700',
  white: 'text-indigo-700',
  red: 'text-white',
  green: 'text-white',
  yellow: 'text-white',
  indigo: 'text-white',
  darkblue: 'text-white',
  gray: 'text-white',
  lightindigo: 'text-white',
};

const plainTextColorClasses: Record<ColorType, string> = {
  blue: 'text-blue-500 hover:text-blue-700 focus:text-blue-600',
  lightblue: 'text-lightblue',
  white: 'text-white',
  red: 'text-red-500 hover:text-red-700 focus:text-red-600',
  green: 'text-green-500 hover:text-green-700 focus:text-green-600',
  yellow: 'text-yellow-500 hover:text-yellow-700 focus:text-yellow-600',
  indigo: 'text-indigo-500 hover:text-indigo-700 focus:text-indigo-600',
  darkblue: 'text-darkblue-700 hover:text-darkblue-900 focus:text-darkblue-800',
  gray: 'text-gray-700 hover:text-gray-900 focus:text-gray-800',
  lightindigo: 'text-indigo-100 hover:text-blue-500 hover:text-blue-500',
};

const plainTextCurrentColorClasses: Record<ColorType, string> = {
  blue: 'text-blue-600',
  lightblue: 'text-lightblue',
  white: 'text-white',
  red: 'text-red-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  indigo: 'text-indigo-700',
  darkblue: 'text-darkblue-800',
  gray: 'text-gray-800',
  lightindigo: 'text-white',
};

const sizeClasses: Record<SizeType, string> = {
  xxs: 'text-xs md:text-xs',
  xs: 'text-xs md:text-sm',
  sm: 'text-xs md:text-sm',
  md: 'text-sm md:text-base',
  lg: 'text-sm md:text-base',
};

const spaceClasses: Record<SizeType, string> = {
  xxs: 'px-2 py-1.5 md:py-1.5 md:px-2.5',
  xs: 'px-2 py-1.5 md:py-1.5 md:px-3',
  sm: 'px-3 py-2 md:py-2 md:px-4',
  md: 'px-3 py-2 md:py-2 md:px-4',
  lg: 'px-4 py-2 md:py-3 md:px-6',
};

const iconSizeClasses: Record<SizeType, string> = {
  xxs: 'w-4 h-4',
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
};

const iconOnlySizeClasses: Record<SizeType, string> = {
  xxs: 'w-8 h-8',
  xs: 'w-8 h-8 md:w-9 md:h-9',
  sm: 'w-10 h-10 md:w-10 md:h-10',
  md: 'w-10 h-10 md:w-11 md:h-11',
  lg: 'w-10 h-10 md:w-12 md:h-12',
};

const alignClasses: Record<AlignType, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export const Button = (props: ButtonProps) => {
  if (isInternalLink(props.href)) {
    return (
      <Link href={props.href}>
        <ButtonInner {...props} as="span" />
      </Link>
    );
  }

  return <ButtonInner {...props} />;
};

export const ButtonMemo = React.memo(Button);

const ButtonInner = ({
  as = 'a',
  label = '',
  href,
  onClick,
  target,
  size = 'lg',
  theme = 'blue',
  stretch = false,
  round = false,
  icon,
  iconPosition = 'after',
  plain = false,
  compact = false,
  medium = false,
  ariaLabel,
  align = 'center',
  current = false,
  disabled = false,
  loading = false,
  download = false,
}: ButtonProps) => {
  const Element = as === 'submit' ? 'button' : as;
  const props = {
    type: null,
    href: null,
    target: null,
    download: null,
  };

  label = label || '';
  iconPosition = iconPosition || 'after';

  // prevent orphan icon by adding first / last word to icon
  const labelWords = label?.split(' ');

  if (as === 'button' || as === 'submit') {
    props.type = as === 'submit' ? 'submit' : 'button';
  }

  if (as === 'a') {
    props.href = href;
    props.target = target;
  }

  if (download) {
    props.download = true;
    if (props.href?.indexOf('.sanity.io') > -1) props.href = `${props.href}?dl`;
  }

  const handleClick = (e: React.MouseEvent) =>
    disabled ? () => {} : onClick ? onClick(e) : () => {};

  const ButtonIcon = icon
    ? ({ wordBefore, wordAfter }: { wordBefore?: string; wordAfter?: string }) => (
        <span className=" whitespace-nowrap break-all">
          {wordBefore && ` ${wordBefore}\u00A0\u00A0`}
          <Icon
            name={icon}
            className={cx(
              'inline text-current transform -translate-y-px',
              iconSizeClasses[size],
            )}
          />
          {wordAfter && `\u00A0\u00A0${wordAfter} `}
        </span>
      )
    : null;

  const sharedClasses = {
    ['border transition-colors duration-200']: true,
    ['font-medium']: current,
    ['rounded-full']: round,
    [bgClasses[theme]]: true,
    [bgCurrentClasses[theme]]: current,
    ['inline-flex items-center justify-center']: !stretch,
    ['bg-opacity-0 border-opacity-0']: plain,
    ['hover:bg-opacity-0 focus:bg-opacity-0']: plain,
    ['hover:underline focus:underline']: plain,
    [current ? plainTextCurrentColorClasses[theme] : plainTextColorClasses[theme]]:
      plain,
    [current ? textColorCurrentClasses[theme] : textColorClasses[theme]]: !plain,
    ['pointer-events-none opacity-75']: disabled,
  };

  // icon only button
  if (!label?.trim()?.length) {
    return (
      <Element
        {...props}
        aria-label={ariaLabel || label}
        onClick={handleClick}
        className={cx('btn', {
          ['w-full']: stretch,
        })}
      >
        <span
          className={cx(sharedClasses, { [iconOnlySizeClasses[size]]: !compact })}
        >
          {ButtonIcon && <ButtonIcon />}
          {loading && <ButtonLoader />}
        </span>
      </Element>
    );
  }

  // icon + text button
  return (
    <Element
      {...props}
      aria-label={ariaLabel || label}
      onClick={handleClick}
      className={cx('btn', {
        ['w-full']: stretch,
      })}
    >
      <span
        className={cx(
          sharedClasses,
          sizeClasses[size],
          alignClasses[align],
          { ['w-full flex']: stretch },
          { ['rounded-full']: round },
          { [spaceClasses[size]]: !compact },
        )}
      >
        <span
          className={`no-underline text-left break-words ${
            medium ? 'font-medium' : ''
          }`}
        >
          {ButtonIcon ? (
            <>
              {ButtonIcon && iconPosition === 'before' && (
                <ButtonIcon wordAfter={labelWords[0]} />
              )}
              {iconPosition === 'before'
                ? labelWords?.slice(1)?.join(' ')
                : labelWords?.slice(0, -1)?.join(' ')}
              {ButtonIcon && iconPosition === 'after' && (
                <ButtonIcon wordBefore={labelWords[labelWords?.length - 1]} />
              )}
              {loading && <ButtonLoader />}
            </>
          ) : (
            <span className="flex">
              {label}
              {loading && <ButtonLoader />}
            </span>
          )}
        </span>
      </span>
    </Element>
  );
};

const ButtonLoader = () => (
  <span className="h-5 w-5 inline-flex self-center align-middle ml-2 -mb-1">
    <Spinner />
  </span>
);
