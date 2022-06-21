import hash from 'object-hash';
import sendEmail from './sendEmail';
import { getContact, getSalesforceObject } from './salesforce';

const isPasswordValid = (userPass, password) => {
  return userPass && hash({ password: userPass }) === password;
};

export const getPasswordForUser = async (email, password) => {
  const res = await getContact(email);

  // Got multiple contacts, check if one fits the typed password
  if (Array.isArray(res)) {
    for (const contact of res) {
      const { Password__c } = await getSalesforceObject(contact);
      if (isPasswordValid(Password__c, password)) return Password__c;
    }
  }

  const { Password__c, Full_Name__c } = res;
  return { Password__c, Full_Name__c };
};

export const isUserValid = async (email, password) => {
  const { Password__c, Full_Name__c } = await getPasswordForUser(email, password);

  return { isValid: isPasswordValid(Password__c, password), name: Full_Name__c };
};

const formatEmailHtml = password => {
  const body = `
    <p>Hi,</p>
    <p>Your password for the <a href='https://harmon.ie/login'>harmon.ie Download Area</a> is:<br>${password}</p>
    <p>Best regards,<br>The harmon.ie Team</p>
  `;
  return body;
};

export const sendResetPasswordEmail = async (email, password) => {
  const html = formatEmailHtml(password);
  await sendEmail({
    subject: 'harmon.ie Password Recovery',
    to: [email],
    html,
  });
};
