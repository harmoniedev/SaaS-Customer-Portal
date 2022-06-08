import React from 'react';

export const Checkbox = ({ id, handelCheckbox, checked }) => {
  return (
    <input
      type="checkbox"
      className="w-6 h-6 text-indigo-300 bg-gray-100 border-gray-300 rounded focus:ring-indigo-300 focus:ring-2 mr-2"
      id={id}
      onChange={handelCheckbox}
      checked={checked}
    />
  );
};
