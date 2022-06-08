import React, { useState } from 'react';

import { Button } from '../buttons/Button';
import { Dropdown } from '../dropdown/Dropdown';
import { Title } from '../title/Title';

const filtersOption = [
  {
    slug: 'product',
    title: 'Product',
  },
  {
    slug: 'last-active',
    title: 'Last Active',
  },
  {
    slug: 'role',
    title: 'Role',
  },
  {
    slug: 'department',
    title: 'Department',
  },
  {
    slug: 'domain',
    title: 'Domain',
  },
];
export const Filter = ({ isMobile }) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

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
        <Dropdown position={isMobile ? '-left-5 top-3' : ''}>
          <div className="flex flex-col items-start p-5">
            <Title size="xxs">Select Filter:</Title>
            {filtersOption.map(({ slug, title }, idx) => (
              <button
                key={idx}
                type="button"
                id={slug}
                onClick={(e) => console.log(slug)}
                className="py-2.5 text-base"
              >
                {title}
              </button>
            ))}
          </div>
        </Dropdown>
      )}
    </div>
  );
};
