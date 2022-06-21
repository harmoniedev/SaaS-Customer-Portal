const SF_HOST = 'https://na79.salesforce.com';
const SF_BASE_URL = `${SF_HOST}/services/data/v39.0/sobjects`;

const salesforceRequest = (api, method = 'GET', token, body) =>
  fetch(api, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

const getSfToken = async () => {
  const baseUrl = 'https://login.salesforce.com/services/oauth2/token';
  const params = [
    'grant_type=password',
    `client_id=${process.env.SALESFORCE_CLIENT_ID}`,
    `client_secret=${process.env.SALESFORCE_CLIENT_SECRET}`,
    `username=${process.env.SALESFORCE_USERNAME}`,
    `password=${process.env.SALESFORCE_PASSWORD}`,
  ];
  const url = `${baseUrl}?${params.join('&')}`;
  const response = await fetch(url, { method: 'post' });
  const { access_token } = await response.json();
  return access_token;
};

const getSalesforceObject = async objectPath => {
  const token = await getSfToken();
  const contactDetails = await salesforceRequest(`${SF_HOST}${objectPath}`, 'GET', token);
  return contactDetails.json();
};

const getContact = async email => {
  const sfToken = await getSfToken();
  const userSfUrl = `${SF_BASE_URL}/Contact/Email/${email}`;
  const response = await fetch(userSfUrl, {
    headers: {
      Authorization: `Bearer ${sfToken}`,
    },
  });

  const res = await response.json();
  console.log(res, 1111)
  if (Array.isArray(res)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const contact of res) {
      // eslint-disable-next-line no-await-in-loop
      const contactRes = await getSalesforceObject(contact);
      if (contactRes && contactRes.AccountId) return contactRes;
    }
  }
  return res;
};

module.exports = {
  getContact,
  getSalesforceObject,
};
