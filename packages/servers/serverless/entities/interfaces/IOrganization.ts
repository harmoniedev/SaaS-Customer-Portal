import { ISubscription } from "./ISubscription";

export interface IOrganization {
  tenantId: string;
  subscription: ISubscription[];
}
