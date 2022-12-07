import React from 'react';

export type WidthProps = {
  children: React.ReactElement;
};

export const Width = ({ children }: WidthProps) => {
  return <div className="mx-auto px-4 max-w-xl">{children}</div>;
};

export const WidthMemo = React.memo(Width);
