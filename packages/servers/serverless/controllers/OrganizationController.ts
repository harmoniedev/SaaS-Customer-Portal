import { IConfig } from "../entities";
import { IOrganizationService, OrganizationService } from "../services";

export class OrganizationController {
  private readonly _organizationService: IOrganizationService;
  private readonly _configuration: IConfig;
  constructor(configuration: IConfig) {
    this._configuration = configuration;
    this._organizationService = new OrganizationService(this._configuration);
  }
  async getLicense(tenantId: string) {
    return await this._organizationService.getOrgLicenses(tenantId);
  }
}
