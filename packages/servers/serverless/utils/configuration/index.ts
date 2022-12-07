import { DbTypes, IConfig } from "../../entities";

const resolveSubscriptionEndPoint =
  process.env.RESOLVE_SUBSCRIPTION_API_END_POINT;
const authenticationUrl = process.env.MICROSOFT_LOGIN_END_POINT;
const tenantId = process.env.APP_TENANT_ID;
const appClientId = process.env.APP_CLIENT_ID;
const subscriptionBaseUrl = process.env.FULFILLMENT_BASE_URL;
const appClientSecret = process.env.APP_CLIENT_SECRET;
const activateSubscriptionEndPoint =
  process.env.ACTIVATE_SUBSCRIPTION_API_END_POINT;
const fulfillmentApiVersion = process.env.RESOLVE_SUBSCRIPTION_API_VERSION;
const dbType = DbTypes[process.env.DB_TYPES];

export const appConfig: IConfig = {
  resolveSubscriptionEndPoint,
  subscriptionBaseUrl,
  activateSubscriptionEndPoint,
  fulfillmentApiVersion,
  authenticationUrl,
  tenantId,
  appClientId,
  appClientSecret,
  dbType,
};
