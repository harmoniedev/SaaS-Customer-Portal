import React, { useEffect, useState } from 'react';

import { TitleMemo as Title } from '../components/title/Title';
import { PaperMemo as Paper } from '../components/paper/Paper';
import { LinkMemo as Link } from '../components/buttons/Link';
import { TabelMemo as Tabel } from '../components/tabel/Tabel';
import { Icon } from '../components/icons/Icon';
import { Spinner } from '../components/loaders/Spinner';
import { StaticState } from '../types';
import { parseJWT } from "../helpers/utils/jwt";
import Cookies from "js-cookie"
import CustomizedDialogs from '../components/dialogs/dialogs';
import { Button } from '../components/buttons/Button';

type Domain = string;
type Subdomain = string;
const resolveAllSubdomains = async (domains: Domain[], token: string, endpoint: string): Promise<Subdomain[]> =>
{
  let promises: Promise<Subdomain[]>[] = [];

  domains.map((domain) =>
  {
    promises.push(resolveSubdomains(domain, token, endpoint))
  })
  
  return Promise.all(promises).then((res) =>
  {
    const subdomains: Subdomain[] = [];
    res.map((keys) =>
    {
      if (Boolean(keys) && Boolean(keys.length))
      {
        resolveSubdomainsFromKeys(keys).map((subdomain) =>
        {
          subdomains.push(subdomain)
        })
      }
    })
    return subdomains
  })
}

const resolveSubdomains = async (domain: Domain, token: string, endpoint: string): Promise<Subdomain[]> =>
{
  return new Promise(async (resolve) =>
  {
    await fetch(`${process.env.API_URL}${endpoint}?q=${domain}`, {
      headers: {
        authorization: `Bearer ${token}`
      },
    }).then((res) =>
    {
      resolve(res.json())
    })
  })
}
const getSubdomainsForDomain = (domain: string, subdomains: string[]): Subdomain[] =>
{
  let sub_domains = []
  for (var i = 0; i < subdomains.length; i++)
  {
    if (subdomains[i].split(":")[0] === domain)
    {
      sub_domains.push(subdomains[i].split(":")[1])
    }
  }
  return sub_domains
}
const resolveSubdomainsFromKeys = (keys: string[]): Subdomain[] =>
{
  let totalSubdomains = []
  for (var i = 0; i < keys.length; i++)
  {
    totalSubdomains.push(keys[i])
  }
  return totalSubdomains
}
const lastDateVerfication = (item: any) =>
{
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  var today = new Date();
  var lastDate = new Date(item.last_date * 1000)
  const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utc2 = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
  return Math.floor((utc1 - utc2) / _MS_PER_DAY) < 90
}
export const DashboardScene = () =>
{
  const [licenseCount, setLicenseCount] = useState<number>(0);
  const [assignedLicensesCount, setAssignedLicensesCount] = useState<number>(0);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [state, setState] = useState<StaticState>('idle');
  const [uniqueProductOption, setUniqueProductOption] = useState<string[]>([]);
  const [uniqueDomainOption, setUniqueDomainOption] = useState<string[]>([]);

  const token = Cookies.get('token');

  const getData = async () =>
  {
    const domain = Object.keys(parseJWT((token)))[1];
    const queryParameters = new URL(domain).searchParams;
    let domains = queryParameters.get("domains").split(",");
    domains = domains.filter((value, index) => domains.indexOf(value) === index);
    const subdomains = await resolveAllSubdomains(domains, token, "/subdomains");
    const subdomains_free = await resolveAllSubdomains(domains, token, "//subdomains_free");
    const final_subdomains = (subdomains.concat(subdomains_free)).filter(function (value, index, array)
    {
      return array.indexOf(value) === index;
    });

    let endpoint = "/domain_data/"
    try
    {
      setState('loading');
      // pass here token defined in 23 string
      let rows: any, columns: any, count: any
      let response: any, jsonRespBody: any, licenseCount = 0, licenseCountTopics = 0, userCount = 0
      for (var i = 0; i < final_subdomains.length; i++)
      {
        response = await fetch(`${process.env.API_URL}${endpoint}${final_subdomains[i].split(":")[1].split(",")[0]}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const text = await response.text();
        const el = text.split(']]}');
        /// Your api gives in response not correct object(actually not the object at all), thats why I am using this
        if (el[1].length > 0)
        {
          jsonRespBody = JSON.parse(el[0] + '],' + el[1].slice(3, el[1].length - 1).replaceAll("]\n\n[", ",") + ']}');
        }
        else
        {
          jsonRespBody = JSON.parse(el[0] + ']]}');

        }

        if (endpoint === "/domain_data/")
        {
          count = jsonRespBody.count
          licenseCountTopics += jsonRespBody.count.topics
          userCount += jsonRespBody.count['']
        }

        if (i === 0)
        {
          rows = jsonRespBody.rows
          columns = jsonRespBody.columns
        }
        if (i > 0)
        {
          for (var j = 0; j < jsonRespBody.rows.length; j++) { rows.push(jsonRespBody.rows[j]) }
        }
        if (i === final_subdomains.length - 1 && endpoint === "/domain_data/")
        {
          i = 0
          endpoint = "/domain_data_free/"
        }
      }

      for (var i = 0; i < domains.length; i++)
      {
        let sub_domains = getSubdomainsForDomain(domains[i], final_subdomains)
        response = await fetch(`${process.env.API_URL}/license_number`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sub_domains)
        });
        licenseCount += parseInt(await response.text())
      }
      const users = rows
        .map((item) =>
        {
          const user = {};
          item.forEach((value, index) =>
          {

            if (/[a-z]/gim.test(columns[index]))
            {
              user[columns[index]] = value;
            }
          });
          return user;
        })
        .filter((item) => (item.build_version || item.product_name))
      userCount = users.length
      setLicenseCount(licenseCount);
      setAssignedLicensesCount(licenseCountTopics);
      setAssignedLicensesCount(userCount)
      setListAllUsers(users);
      setUniqueProductOption(
        Array.from(new Set(users.map((user) => user.product_name))),
      );
      setUniqueDomainOption(
        Array.from(new Set(users.map((user) => user.publicsuffix))),
      );

      // Update the cookie
      const responseToken = response.headers.get('authorization').split(' ')[1]
      Cookies.set('token', responseToken, { secure: true, sameSite: 'strict' });

      setState('success');
    } catch (error)
    {
      setState('error');
    }
  };

  useEffect(() =>
  {
    getData();
  }, []);

  return (
    <div>
      {assignedLicensesCount > 15000 && (
      <Paper>
      <div className="p-6 lg:p-8 flex gap-6 flex-col">
        <div className="flex justify-between items-center">
        <Title size="md">
          Your user base is too large to be displayed in this portal, please contact support<br/> 
        <Button 
        label='Contact Us'
              align="center"
              size="md"
              theme={'green'}onClick={() => window.location.href = 'mailto:custservices@harmon.ie'}></Button>
          </Title>
        </div>
      </div>
    </Paper>
      
      )}
      {state === 'success' && assignedLicensesCount < 15000  &&(
        <div>
          
          <div className="mt-8">
            <div className="mb-10">
              <Paper>
                <div className="p-6 lg:p-8 flex gap-6 flex-col">
                  <div className="flex justify-between items-center">
                    <Title size="md">
                    Purchased Licenses - {assignedLicensesCount}
                    </Title>
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
      {state === 'loading' && assignedLicensesCount < 15000  &&(
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
