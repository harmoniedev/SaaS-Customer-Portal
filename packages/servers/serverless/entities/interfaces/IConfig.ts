import { DbTypes } from "../enums";

export interface IConfig {
  subscriptionBaseUrl: string;
  resolveSubscriptionEndPoint: string;
  activateSubscriptionEndPoint: string;
  fulfillmentApiVersion: string;
  authenticationUrl: String;
  tenantId: string;
  appClientId: string;
  appClientSecret: string;
  dbType: DbTypes;
}
