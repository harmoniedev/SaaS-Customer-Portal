import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

import { TitleMemo as Title } from '../components/title/Title';
import { PaperMemo as Paper } from '../components/paper/Paper';
import { LinkMemo as Link } from '../components/buttons/Link';
import { TabelMemo as Tabel } from '../components/tabel/Tabel';
import { Icon } from '../components/icons/Icon';
import { Spinner } from '../components/loaders/Spinner';
import { StaticState } from '../types';

import DataAPI from '../api/data';

const dataAPI = new DataAPI();

export const DashboardScene = () => {
  const { accounts } = useMsal();
  const [licenseCount, setLicenseCount] = useState<number>(0);
  const [assignedLicensesCount, setAssignedLicensesCount] = useState<number>(0);
  const [state, setState] = useState<StaticState>('idle');
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  useEffect(() => {
    try {
      setState('loading');
      const getOrganizationData = async () => {
        const response = await dataAPI.getLicenses({
          tid: accounts[0]?.tenantId,
          token,
        });

        setAssignedLicensesCount(response.data.assigned_licenses_count);
        setLicenseCount(response.data.license_count);
        setState('success');
      };

      getOrganizationData();
    } catch (error) {
      console.log(error);
      setState('error');
    }
  }, [accounts, token]);

  return (
    <div>
      {state === 'success' && (
        <div>
          <Title size="lg" className="">
            Dashboard
          </Title>
          <div className="mt-8">
            <div className="mb-10">
              <Title size="xs" className="mb-5">
                Subscription
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
            <Tabel />
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
