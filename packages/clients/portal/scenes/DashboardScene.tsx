import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { TitleMemo as Title } from '../components/title/Title';
import { PaperMemo as Paper } from '../components/paper/Paper';
import { LinkMemo as Link } from '../components/buttons/Link';
import { TabelMemo as Tabel } from '../components/tabel/Tabel';
import { Icon } from '../components/icons/Icon';
import { Spinner } from '../components/loaders/Spinner';
import { StaticState } from '../types';
import { useMsal } from '@azure/msal-react';

export const DashboardScene = () => {
  const [licenseCount, setLicenseCount] = useState<number>(0);
  const [assignedLicensesCount, setAssignedLicensesCount] = useState<number>(0);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [state, setState] = useState<StaticState>('idle');
  const [uniqueProductOption, setUniqueProductOption] = useState<string[]>([]);
  const [uniqueDomainOption, setUniqueDomainOption] = useState<string[]>([]);

  const { accounts } = useMsal();
  const storadgeKey = accounts[0]
    ? `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`
    : null;
  // const token = accounts[0] ? JSON.parse(sessionStorage.getItem(storadgeKey)).secret : Cookies.get('download-token');
  // this is the test token, use token defined on 23 str
  const token = process.env.TEMP_TOKEN;
  const getData = async () => {
    try {
      setState('loading');
      // pass here token defined in 23 string
      const response = await fetch(`${process.env.API_URL}/domain_data/harmon.ie`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const text = await response.text();
      const el = text.split(']]}')[0];

      /// Your api gives in response not correct object(actually not the object at all), thats why I am using this
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
      setLicenseCount(count['']);
      setAssignedLicensesCount(jsonRespBody.count.topics);
      setListAllUsers(users);
      setUniqueProductOption(
        Array.from(new Set(users.map((user) => user.product_name))),
      );
      setUniqueDomainOption(
        Array.from(new Set(users.map((user) => user.publicsuffix))),
      );

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
            {!!listAllUsers && (
              <Tabel
                listAllUsers={listAllUsers}
                uniqueDomainOption={uniqueDomainOption}
                uniqueProductOption={uniqueProductOption}
              />
            )}
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
