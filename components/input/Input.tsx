import React, { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';

export type InputProps = {
  type?: 'search' | 'text' | 'email' | 'tel' | 'password';
  value?: string | string[];
  inputName?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  setValue?: Dispatch<SetStateAction<string>>;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  name,
  placeholder = '',
  type = 'text',
  value,
  setValue,
  className = '',
  id = '',
  maxLength = 100,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className={className}
    />
  );
};

export const InputMemo = React.memo(Input);
