import { OrgLicensesDetails } from "../../../entities";

export interface IOrganizationService {
  getOrgLicenses(tenantId: string): Promise<OrgLicensesDetails>;
}
