import { ISubscription } from "./ISubscription";

export interface IOrganization {
  _id?: string;
  tenantId: string;
  subscriptions?: ISubscription[];
}
