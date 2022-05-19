import { DbTypes } from "../types";

export interface IConfig {
  resolveSubscriptionEndPoint: string;
  fulfillmentApiVersion: string;
  authenticationUrl: String;
  tenantId: string;
  appClientId: string;
  appClientSecret: string;
  dbType: DbTypes;
}
