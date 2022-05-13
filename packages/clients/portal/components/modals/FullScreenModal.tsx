import React from 'react';
import { Portal } from 'react-portal';
import { Button } from '../buttons/Button';

export type FullScreenModalType = {
  children: React.ReactElement | React.ReactNode;
  handleOutsideClick?: (value: boolean) => void;
};

export const FullScreenModal = ({
  children,
  handleOutsideClick,
}: FullScreenModalType) => {
  return (
    <Portal>
      <div className="h-full fixed w-full z-50 top-0">
        <div className="grid grid-cols-6 h-full w-full">
          <div className="bg-white h-full w-full relative text-indigo-800 text-base overflow-auto col-span-5">
            <div className="flex items-center justify-items-end justify-end w-fill py-2.5 px-4 border-b border-indigo-100 mb-4">
              <Button
                as={'button'}
                icon="CloseIcon"
                plain
                onClick={() => handleOutsideClick(false)}
              />
            </div>

            {children}
          </div>
          <div
            className="bg-gray-800 h-full opacity-20"
            onClick={() => handleOutsideClick(false)}
          />
        </div>
      </div>
    </Portal>
  );
};

export const FullScreenModalMemo = React.memo(FullScreenModal);
