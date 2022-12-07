import React from 'react';

export type CheckboxProps = {
  id: string;
  checked: boolean;
  handelCheckbox: React.ChangeEventHandler<HTMLInputElement>;
};
export const Checkbox = ({ id, handelCheckbox, checked }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className="w-6 h-6 text-indigo-300 bg-gray-100 border-gray-300 rounded focus:ring-indigo-300 focus:ring-2"
      id={id}
      onChange={handelCheckbox}
      checked={checked}
    />
  );
};
