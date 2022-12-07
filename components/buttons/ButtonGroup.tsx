import cx from 'classnames';
import React from 'react';

import { Button, ButtonProps } from './Button';
import { DIRECTION_OPTIONS } from './ButtonGroupOptions';

export type DirectionType = keyof typeof DIRECTION_OPTIONS;

export type ButtonGroupProps = {
  items: ButtonProps[];
  direction?: DirectionType;
  stretch?: boolean;
};

export const ButtonGroup = ({ items, direction, stretch }: ButtonGroupProps) => {
  return (
    <div
      className={cx('flex-wrap gap-4', {
        ['flex-col']: direction === 'vertical',
        ['inline-flex']: !stretch,
        ['flex w-full']: stretch,
      })}
    >
      {items?.map((item) => (
        <div
          key={item.label}
          className={cx('flex-shrink-0 max-w-full cursor-pointer', {
            ['w-full']: item.stretch,
          })}
        >
          <Button {...item} />
        </div>
      ))}
    </div>
  );
};

export const ButtonGroupMemo = React.memo(ButtonGroup);
