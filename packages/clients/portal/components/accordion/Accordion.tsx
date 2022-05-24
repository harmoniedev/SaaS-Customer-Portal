import * as RadixAccordion from '@radix-ui/react-accordion';
import React from 'react';

import { slugify } from '../../helpers/utils/string';
import { Button } from '../buttons/Button';

export type AccordionItemType = {
  title: string;
  content: React.ReactNode | React.ReactElement;
};

export type AccordionProps = {
  items: AccordionItemType[];
};

export const Accordion = ({ items }: AccordionProps) => {
  if (!Boolean(items?.length)) return;

  return (
    <div className="filter drop-shadow-lg radix-accordion border border-gray-200">
      <RadixAccordion.Root type="multiple" className="divide-y divide-gray-200">
        {items?.map(({ title, content }) => {
          const slug = slugify(title);

          return (
            <RadixAccordion.Item
              value={slug}
              key={slug}
              id={slug}
              className="radix-scroll-margin"
            >
              <RadixAccordion.Header className="bg-white hover:underline radix-accordion-title">
                <RadixAccordion.Trigger className="bg-white p-5 md:p-7 lg:p-8 text-base md:text-md lg:text-lg flex items-center w-full radix-accordion-trigger">
                  <div className="pr-3 text-left">{title}</div>
                  <span className="flex-shrink-0 ml-auto">
                    <Button icon="ChevronDownIcon" label="" as="div" />
                  </span>
                </RadixAccordion.Trigger>
              </RadixAccordion.Header>
              <RadixAccordion.Content className="bg-white radix-accordion-content overflow-hidden">
                <div className="prose prose-sm md:prose break-words h-full p-5 md:p-7 lg:p-8 pt-0 md:pt-0 lg:pt-0 max-w-accordion">
                  {content}
                </div>
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          );
        })}
      </RadixAccordion.Root>
    </div>
  );
};

export const AccordionMemo = React.memo(Accordion);
