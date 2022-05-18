import { OrganizationService } from "../services/business";

export class OrganizationController {
  private readonly _organizationService: OrganizationService;
  constructor() {
    this._organizationService = new OrganizationService();
  }
  async getLicense(tenantId: string) {
    return await this._organizationService.getOrgLicenses(tenantId);
  }
}
