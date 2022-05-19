import { Logger } from "@azure/functions";
import { IConfig, IOrganization, OrgLicensesDetails } from "../../entities";
import {
  OrganizationRepositoryFactory,
  BaseRepository,
} from "../../repositories";
import { IOrganizationService } from "../interfaces";

export class OrganizationService implements IOrganizationService {
  private readonly _organizationRepository: BaseRepository<IOrganization>;
  private readonly _organizationFactory = new OrganizationRepositoryFactory();
  private readonly _configuration: IConfig;
  private readonly _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._organizationRepository = this._organizationFactory.initRepository(
      this._configuration.dbType
    );
  }
  async getOrgLicenses(tenantId: string): Promise<OrgLicensesDetails> {
    this._logger.info(
      `[OrganizationService - getOrgLicenses] started for tenantId ${tenantId}, dateTime ${new Date().toISOString()}`
    );
    let organization: IOrganization;
    try {
      organization = await this._organizationRepository.findOne<IOrganization>({
        tenantId,
      });
    } catch (error: any) {
      this._logger.info(
        `[OrganizationService - getOrgLicenses] error for tenantId ${tenantId}, error dateTime ${new Date().toISOString()}, error: ${
          error.message
        }`
      );
      throw error;
    }
    this._logger.info(
      `[OrganizationService - getOrgLicenses] finish for tenantId ${tenantId}, dateTime ${new Date().toISOString()}`
    );
    return new OrgLicensesDetails(
      organization.licenseCount,
      organization.assignedLicensesCount
    );
  }
}
