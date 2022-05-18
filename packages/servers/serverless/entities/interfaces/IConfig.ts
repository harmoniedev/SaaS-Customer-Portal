import { DbTypes } from "../types";

export interface IConfig {
  resolveSubscriptionEndPoint: string;
  authenticationUrl: String;
  tenantId: string;
  appClientId: string;
  appClientSecret: string;
  dbType: DbTypes;
}
