import { DbTypes } from "../entities";
import { OrganizationService } from "../services";

export class OrganizationController {
  private readonly _organizationService: OrganizationService;
  constructor(dbType: DbTypes) {
    this._organizationService = new OrganizationService(dbType);
  }
  async getLicense(tenantId: string) {
    return await this._organizationService.getOrgLicenses(tenantId);
  }
}
