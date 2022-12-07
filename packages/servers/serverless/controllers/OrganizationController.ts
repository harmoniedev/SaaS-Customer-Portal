import { Logger } from "@azure/functions";
import { IConfig, OrgLicensesDetails } from "../entities";
import { IOrganizationService, OrganizationService } from "../services";
import { BaseController } from "./base/BaseController";

export class OrganizationController extends BaseController {
  private readonly _organizationService: IOrganizationService;
  constructor(configuration: IConfig, log: Logger) {
    super(configuration, log);
    this._organizationService = new OrganizationService(
      this._configuration,
      this._logger
    );
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
      throw error;
    }
    this._logger.info(
      `[OrganizationController - getLicense ] finished for tenantId ${tenantId}, dateTime: ${new Date().toISOString()}`
    );
    return license;
  }
}
