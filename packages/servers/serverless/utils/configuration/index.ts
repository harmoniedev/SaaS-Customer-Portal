import { DbTypes, IConfig } from "../../entities";

const resolveSubscriptionEndPoint =
  process.env.RESOLVE_SUBSCRIPTION_API_END_POINT;
const authenticationUrl = process.env.MICROSOFT_LOGIN_END_POINT;
const tenantId = process.env.TENANT_ID;
const appClientId = process.env.APP_CLIENT_ID;
const appClientSecret = process.env.APP_CLIENT_SECRET;
const fulfillmentApiVersion = process.env.RESOLVE_SUBSCRIPTION_API_VERSION;
const dbType = DbTypes[process.env.DB_TYPES];
export const appConfig: IConfig = {
  resolveSubscriptionEndPoint,
  fulfillmentApiVersion,
  authenticationUrl,
  tenantId,
  appClientId,
  appClientSecret,
  dbType,
};
