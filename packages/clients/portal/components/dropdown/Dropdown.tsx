import React, { Children } from 'react';
import { Paper } from '../paper/Paper';
import { motion } from 'framer-motion';

export type DropdownProps = {
  children: any;
  position: string;
};

export const Dropdown = ({ children, position = 'top-0 left-3' }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`absolute ${position}`}
      >
        <Paper>
          <div className="flex flex-col items-start w-48 lg:w-64">{children}</div>
        </Paper>
      </motion.div>
    </div>
  );
};

export const DropdownMemo = React.memo(Dropdown);
