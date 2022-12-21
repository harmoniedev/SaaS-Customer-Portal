import React from 'react';
import cx from 'classnames';

import NextImage from 'next/image';

import { CardShadow } from './CardShadow';
import { Title } from '../title/Title';
import { Link } from '../buttons/Link';

export type ResourceCardProps = {
  title?: string;
  href?: string;
  label?: string;
  image?: string;
};

export const ArticleCard = ({ title, href, image, label }: ResourceCardProps) => {
  return (
    <CardShadow>
      <Link href={href}>
        <li className={cx('flex flex-col h-full')}>
          {image && (
            <div className="w-full h-56 lg:h-48  relative">
              <NextImage src={image} layout="fill" />
            </div>
          )}
          <div className="p-6 flex-grow flex flex-col gap-4">
            {label && (
              <span className="-mb-2 block text-xs font-semibold text-indigo-200 break-words">
                {label}
              </span>
            )}
            {title && (
              <Title as="h3" size="xxs">
                {title}
              </Title>
            )}
          </div>
        </li>
      </Link>
    </CardShadow>
  );
};

export const ArticleCardMemo = React.memo(ArticleCard);
