import { DbTypes, IConfig } from "../../entities";

const resolveSubscriptionEndPoint =
  process.env.RESOLVE_SUBSCRIPTION_API_END_POINT;
const authenticationUrl = process.env.MICROSOFT_LOGIN_END_POINT;
const tenantId = process.env.TENANT_ID;
const appClientId = process.env.APP_CLIENT_ID;
const appClientSecret = process.env.APP_CLIENT_SECRET;
export const appConfig: IConfig = {
  resolveSubscriptionEndPoint,
  authenticationUrl,
  tenantId,
  appClientId,
  appClientSecret,
  dbType: DbTypes[process.env.DB_TYPES],
};
