import React, { useState, useEffect } from 'react';

import { Icon } from '../icons/Icon';
import { InputMemo as Input } from '../input/Input';

export type SearchProp = {
  inputValue: string;
  setInputValue: (value: string) => void;
  isMobile: boolean;
};

export const Search = ({ inputValue, setInputValue, isMobile }: SearchProp) => {
  const [isShowClearBtn, setIsShowClearBtn] = useState<boolean>(false);
  const [isShowMobileInput, setIsShowMobileInput] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue === '') return;
    setIsShowClearBtn(true);
  }, [inputValue, isShowClearBtn]);

  const handleClearInput = (e) => {
    setInputValue('');
    setIsShowClearBtn(false);
  };

  return isMobile ? (
    <div className="flex">
      {isShowMobileInput && (
        <div className="relative">
          {isShowClearBtn && (
            <div onClick={handleClearInput}>
              <Icon
                name="X"
                className="absolute top-2.5 right-12 cursor-pointer w-4 h-4 text-indigo-300"
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
            className="text-indigo-300 font-normal mr-10 h-9 w-40"
          />
        </div>
      )}
      <div
        className="border border-indigo-50 p-1.5"
        onClick={() => {
          setIsShowMobileInput(!isShowMobileInput);
        }}
      >
        <Icon name="SearchIcon" className="text-indigo-300 w-6 h-6" />
      </div>
    </div>
  ) : (
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
        className="text-indigo-300 py-2 pl-10 pr-7 font-normal w-80"
      />
    </div>
  );
};

export const SearchMemo = React.memo(Search);
