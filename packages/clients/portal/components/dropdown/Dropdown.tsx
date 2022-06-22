import React, { Children } from 'react';
import { Paper } from '../paper/Paper';

export type DropdownProps = {
  children: any;
  position: string;
};

export const Dropdown = ({ children, position = 'top-0 left-3' }) => {
  return (
    <div className="relative">
      <div className={`absolute ${position}`}>
        <Paper>
          <div className="flex flex-col items-start  w-max">{children}</div>
        </Paper>
      </div>
    </div>
  );
};

export const DropdownMemo = React.memo(Dropdown);
