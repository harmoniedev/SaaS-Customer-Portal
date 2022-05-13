import cx from 'classnames';
import React from 'react';

export type CardProps = {
  children: React.ReactElement | React.ReactNode;
  hover?: boolean;
};

export const CardShadow = ({ children, hover = true }: CardProps) => {
  return (
    <div
      className={cx(
        'group shadow-xl h-full w-full bg-white border border-black border-opacity-5 max-w-xs mx-auto',
        {
          ['cursor-pointer hover:shadow-2xl transition-shadow-transform transform hover:-translate-y-1 ease-out duration-500 hover:border-opacity-20']:
            hover,
        },
      )}
    >
      {children}
    </div>
  );
};
