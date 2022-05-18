import { Logger } from "@azure/functions";
import { IConfig, OrgLicensesDetails } from "../entities";
import { IOrganizationService, OrganizationService } from "../services";

export class OrganizationController {
  private readonly _organizationService: IOrganizationService;
  private readonly _configuration: IConfig;
  private _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._organizationService = new OrganizationService(this._configuration);
  }
  async getLicense(tenantId: string) {
    this._logger.info(
      `[OrganizationController - getLicense ] started for tenantId ${tenantId}, dateTime: ${new Date().toISOString()}`
    );
    let license: OrgLicensesDetails;
    try {
      license = await this._organizationService.getOrgLicenses(tenantId);
    } catch (error: any) {
      this._logger.info(
        `[OrganizationController - getLicense ] error for tenantId ${tenantId}, dateTime: ${new Date().toISOString()}`
      );
    }
    this._logger.info(
      `[OrganizationController - getLicense ] finished for tenantId ${tenantId}, dateTime: ${new Date().toISOString()}`
    );
    return license;
  }
}
