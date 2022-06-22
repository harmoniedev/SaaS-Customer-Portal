import React, { useState } from 'react';

import { Icon } from '../icons/Icon';
import { Button } from '../buttons/Button';
import { Dropdown } from '../dropdown/Dropdown';
import { Title } from '../title/Title';
import { Checkbox } from '../checkbox/Checkbox';

const filtersOption = ['product', 'domain'];

export const Filter = ({ isMobile, uniqueDomainOption, uniqueProductOption }) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [checkedOptionList, setCheckedOptionList] = useState([]);
  const [actiOptions, setActiOptions] = useState('');

  const handelCheckbox = (e) => {
    const { id, checked } = e.target;
    setCheckedOptionList([...checkedOptionList, id]);
    if (!checked) {
      setCheckedOptionList(checkedOptionList.filter((item) => item !== id));
    }
  };
  const listOption = (items) => {
    console.log(items);
    return items.map((item, idx) => (
      <div
        className="flex items-center justify-between w-full cursor-pointer"
        key={idx}
      >
        <Checkbox
          checked={checkedOptionList.includes(item)}
          handelCheckbox={handelCheckbox}
          id={item}
        />
        <button type="button" className="py-2.5 text-base">
          {item}
        </button>
      </div>
    ));
  };
  return (
    <div>
      <Button
        as="button"
        label={`${isMobile ? '' : 'Filter'}`}
        size="md"
        plain
        icon="FilterIcon"
        iconPosition="before"
        theme="indigo"
        onClick={(e) => setIsOpenFilters(!isOpenFilters)}
      />
      {isOpenFilters && (
        <Dropdown position={isMobile ? '-left-5 top-3' : '-left-5'}>
          {!isOpenOptions && (
            <div className="flex flex-col items-start px-3 py-5">
              <div className="flex justify-between items-center gap-2">
                <Title size="xxs">Select Filter:</Title>
                <div>
                  <Icon name="X" className="w-5 h-5" />
                </div>
              </div>
              {filtersOption.map((title, idx) => (
                <div
                  className="flex items-center justify-between w-full cursor-pointer"
                  key={idx}
                  onClick={(e) => {
                    setIsOpenOptions(!isOpenOptions);
                    setActiOptions(title);
                  }}
                >
                  <button
                    key={idx}
                    type="button"
                    id={title}
                    className="py-2.5 capitalize text-base"
                  >
                    {title}
                  </button>
                  <Icon name="ChevronRightIcon" className="w-4 h-4" />
                </div>
              ))}
            </div>
          )}
          {isOpenOptions && (
            <div className="flex flex-col items-start px-3 py-5">
              <div className="flex gap-2 items-center">
                <div
                  className="cursor-pointer"
                  onClick={(e) => setIsOpenOptions(false)}
                >
                  <Icon name="ChevronLeftIcon" className="w-5 h-5" />
                </div>
                <div>
                  <Title size="xxs">Filter by Member</Title>
                </div>
              </div>
              {actiOptions === 'product'
                ? listOption(uniqueProductOption)
                : listOption(uniqueDomainOption)}
            </div>
          )}
        </Dropdown>
      )}
    </div>
  );
};
