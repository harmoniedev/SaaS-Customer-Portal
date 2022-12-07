import React from 'react';
import cx from 'classnames';

import { TitleMemo as Title } from '../components/title/Title';
import { ArticleCardMemo as ArticleCard } from '../components/cards/ArticleCard';
import { AccordionMemo as Accordion } from '../components/accordion/Accordion';
import { accordionItems, listCardItems } from './SupportSceneOptions';

export const SupportScene = () => {
  return (
    <div>
      <Title size="lg" className="">
        Support
      </Title>
      <div className="mt-8">
        <div className="mb-8">
          <Title size="xs" className="mb-5">
            harmon.ie Accord intro title
          </Title>
          <p className="mb-4">
            Drag and drop important client request emails into a Teams conversation
            to create a shared task. Eliminate the inevitable chaos that ensues with
            emails sent to shared mailboxes, like ‘info@,’ ‘sales@,’ or ‘support@.’
          </p>
          <p>
            {' '}
            Once a task is created, team members can weigh in - ask questions, offer
            advice, and even transfer task ownership to another person on the team.
            When everyone participates in the discussion, clients get better answers,
            faster. All from the place where your team collaboration already
            happens... Microsoft Teams.
          </p>
        </div>
        <div className="mb-8">
          <Title size="xs" className="mb-5">
            Watch videos
          </Title>
          {Boolean(listCardItems?.length) && (
            <ul
              className={cx('grid gap-3.5 sm:gap-8', 'grid-cols-1 md:grid-cols-3')}
            >
              {listCardItems?.map(({ title, label, image, href }, i) => (
                <ArticleCard
                  key={i}
                  label={label}
                  title={title}
                  image={image}
                  href={href}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="mb-8">
          <Title size="xs" className="mb-5">
            FAQ
          </Title>
          <Accordion items={accordionItems} />
        </div>
      </div>
    </div>
  );
};

export const SupportSceneMemo = React.memo(SupportScene);
