import React from 'react';

export type PaperProps = {
  children: React.ReactElement | React.ReactNode;
};
export const Paper = ({ children }: PaperProps) => {
  return <div className="bg-white shadow-lg">{children}</div>;
};

export const PaperMemo = React.memo(Paper);
