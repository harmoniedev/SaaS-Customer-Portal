import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.APP_TENANT_ID}`,
    redirectUri: process.env.LOGIN_REDIRECT_URI,
    postLogoutRedirectUri: process.env.LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: false,
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ['User.Read'],
};

export { msalInstance, loginRequest };
