import { ISubscription } from "./ISubscription";

export interface IOrganization {
  tenantId: string;
  subscription: ISubscription[];
  licenseCount: number;
  assignedLicensesCount: number;
}
