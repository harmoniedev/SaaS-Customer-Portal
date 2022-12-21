import * as RadixDialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { Icon } from '../icons/Icon';

export type DialogProps = {
  children: React.ReactNode | React.ReactElement;
  title?: string;
  description?: string;
  open?: boolean;
  mode?: 'video' | 'content' | 'form';
  onOpenChange?(open: boolean): void;
};

export const Dialog = ({
  title,
  description,
  children,
  open = false,
  mode = 'content',
  onOpenChange,
}: DialogProps) => {
  if (!children) return;

  return (
    <div className={cx('radix-dialog', { ['hidden']: !open })}>
      <RadixDialog.Root onOpenChange={onOpenChange} open={open}>
        <RadixDialog.Overlay className="relative z-50">
          <motion.div
            className="fixed inset-0 bg-black w-screen h-screen"
            animate={{ opacity: 0.4 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'circOut', duration: 2 }}
          />
        </RadixDialog.Overlay>
        <RadixDialog.Content
          className={cx(
            'fixed z-50 w-screen top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 max-w-90vw',
            {
              ['max-h-75vh aspect-ratio-16-9']: mode === 'video',
              ['max-w-90vw md:max-w-75vw lg:max-w-text']: mode === 'content',
              ['inline-flex justify-center']: mode === 'form',
            },
          )}
        >
          <motion.div
            animate={{ y: open ? 0 : 60 }}
            initial={{ y: 60 }}
            exit={{ y: 0 }}
            transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.5 }}
            className={cx({
              ['text-indigo-500 overflow-y-auto overflow-scrolling-touch filter shadow-md bg-white rounded-sm p-10 h-auto max-h-75vh ']:
                mode === 'content',
              ['overflow-y-auto overflow-scrolling-touch h-auto max-h-75vh relative']:
                mode === 'form',
            })}
          >
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'circOut' }}
            >
              {title && (
                <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
              )}
              {description && (
                <RadixDialog.Description className="sr-only">
                  {description}
                </RadixDialog.Description>
              )}

              <RadixDialog.Close className="py-3 px-3 text-gray-600 hover:text-gray-700 bg-white hover:bg-gray-50 transition-colors absolute top-0 right-0 z-10">
                <Icon name="XIcon" className="text-current w-5 h-5" />
              </RadixDialog.Close>

              {mode === 'content' && (
                <div className="h-full prose prose-sm md:prose break-words">
                  {children}
                </div>
              )}

              {mode === 'form' && <div>{children}</div>}

              {mode === 'video' && (
                <div className="relative aspect-ratio-16-9">{children}</div>
              )}
            </motion.div>
          </motion.div>
        </RadixDialog.Content>
      </RadixDialog.Root>
    </div>
  );
};

export const DialogMemo = React.memo(Dialog);
