import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

import { TitleMemo as Title } from '../components/title/Title';
import { PaperMemo as Paper } from '../components/paper/Paper';
import { LinkMemo as Link } from '../components/buttons/Link';
import { TabelMemo as Tabel } from '../components/tabel/Tabel';
import { Icon } from '../components/icons/Icon';
import { Spinner } from '../components/loaders/Spinner';
import { StaticState } from '../types';
import { BREAKPOINTS, useBreakpoint } from '../hooks/useBreakpoint';
import { Button } from '../components/buttons/Button';

export const DashboardScene = () => {
  const { screenWidth } = useBreakpoint();
  const [licenseCount, setLicenseCount] = useState<number>(0);
  const [assignedLicensesCount, setAssignedLicensesCount] = useState<number>(0);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [state, setState] = useState<StaticState>('idle');

  const isMobile = screenWidth < BREAKPOINTS.md;

  const getData = async () => {
    try {
      setState('loading');
      const response = await fetch(
        'https://status-manager.harmon.ie/domain_data/harmon.ie',
        {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJFUzUxMiIsImp3ayI6eyJrdHkiOiJFQyIsImNydiI6IlAtNTIxIiwieCI6IkFZeWFIeUZGejBjYmhkVDZHbHpjazNTVkYwLXpVM1AzdGNkM3RGdnFMUUF0eHZBWGU0eGlGWUVvbTFyWGNDQkZLLTdNUlJ6ZERlYkJ3QXNzMHVzZmg4SHEiLCJ5IjoiQVk0N1F6OWVGNWpSNXVqRU94YXUzcnFzR2dtSUcyZ0d2eHR1OU1uSl9uLWxxSzNlU2lGclNsdTJMVUR6bjVhOGpRVU8wQ2pyb3lQYVJNTW9QdUlzS3ZfNyJ9fQ.eyJleHAiOjE2NTU5Njc3ODIsImh0dHA6Ly9saWNlbnNlLW1hbmFnZXIuaGFybW9uLmllL2FsbC9yZWFkP2RvbWFpbnM9aGFybW9uLmllIjp0cnVlLCJwcm92aWRlciI6InplbmRlc2siLCJ1aWQiOiIzOTIyNzEyNTA2NzEiLCJ1c2VybmFtZSI6InZhZGltIChtYWluc29mdCkifQ.ABLs4CvbGHUxDRQgYHvlc5UaipPb3raBvmrfWbTbDZSX-9ZprsQgrN7rR0_tx6DHB2kY1yGwAumdksK-6p8dD9v7AdsbQfZFWCuV8_b2Gss3DKIwQ1iw9rgPHGySeI1B5K9rb170WDEsWT7Xd0PVsKmE4WyXYYuHA4x1iMZuHCETNvyV',
          },
        },
      );
      const text = await response.text();
      const el = text.split(']]}')[0];
      const jsonRespBody = JSON.parse(el + ']]}');

      const { rows, columns, count } = jsonRespBody;
      const users = rows
        .map((item) => {
          const user = {};
          item.forEach((value, index) => {
            if (/[a-z]/gim.test(columns[index])) {
              user[columns[index]] = value;
            }
          });
          return user;
        })
        .filter((item) => item.build_version || item.product_name);

      setLicenseCount(jsonRespBody.count['']);
      setAssignedLicensesCount(jsonRespBody.count.topics);
      setListAllUsers(users);

      setState('success');
    } catch (error) {
      setState('error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {state === 'success' && (
        <div>
          <div className="flex justify-between">
            <Title size="lg" className="">
              Users and licenses
            </Title>
            <Button
              as="button"
              label={isMobile ? 'Import' : 'Import users'}
              size="md"
              icon="ArrowCircleDownIcon"
              iconPosition="before"
            />
          </div>
          <div className="mt-8">
            <div className="mb-10">
              <Title size="xs" className="mb-5">
                Licenses
              </Title>
              <Paper>
                <div className="p-6 lg:p-8 flex gap-6 flex-col">
                  <div>
                    <p className="text-indigo-300 font-medium">
                      Used Licenses - harmon.ie Accord
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Title size="md">
                      {assignedLicensesCount}/{licenseCount}
                    </Title>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 text-blue-500 lg:text-center">
                      <Link href="/portal/billing">
                        <div className="flex gap-2 cursor-pointer">
                          <Icon name="CashIcon" className="w-6 h-6" />
                          <p>Billing</p>
                        </div>
                      </Link>
                      <Link href="/portal/subscription">
                        <div className="flex gap-2 cursor-pointer">
                          <Icon name="CogIcon" className="w-6 h-6" />
                          <p>Manage Subscription</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
            {!!listAllUsers && <Tabel listAllUsers={listAllUsers} />}
          </div>
        </div>
      )}
      {state === 'loading' && (
        <div className="w-full flex items-center justify-center">
          <div className="w-20 h-20">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export const DashboardSceneMemo = React.memo(DashboardScene);
