import React from 'react';

import { Icons, IconName } from './Icons';

export type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon = ({ name, className }: IconProps) => {
  if (!Icons[name]) return null;
  return React.createElement(Icons[name], { className });
};
