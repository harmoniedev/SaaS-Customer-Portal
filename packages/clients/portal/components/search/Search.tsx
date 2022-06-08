import React, { useState, useEffect } from 'react';

import { Icon } from '../icons/Icon';
import { InputMemo as Input } from '../input/Input';

export type SearchProp = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

export const Search = ({ inputValue, setInputValue }: SearchProp) => {
  const [isShowClearBtn, setIsShowClearBtn] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue === '') return;
    setIsShowClearBtn(true);
  }, [inputValue, isShowClearBtn]);

  const handleClearInput = (e) => {
    setInputValue('');
    setIsShowClearBtn(false);
  };

  return (
    <div className="flex">
      <div className="relative">
        <Icon
          name="SearchIcon"
          className="w-5 h-5 absolute text-indigo-300 top-3 left-3"
        />
        {isShowClearBtn && (
          <div onClick={handleClearInput}>
            <Icon
              name="X"
              className="absolute top-3 right-3 cursor-pointer w-5 h-5 text-indigo-300"
            />
          </div>
        )}

        <Input
          name="search"
          placeholder={'Search...'}
          type="search"
          id={'search'}
          value={inputValue}
          setValue={setInputValue}
          className="text-indigo-300 py-1.5 pl-10 pr-7 font-normal w-full"
        />
      </div>
    </div>
  );
};

export const SearchMemo = React.memo(Search);
