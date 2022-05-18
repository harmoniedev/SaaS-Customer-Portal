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
  constructor(configuration: IConfig) {
    this._configuration = configuration;
    this._organizationRepository = this._organizationFactory.initRepository(
      this._configuration.dbType
    );
  }
  async getOrgLicenses(tenantId: string): Promise<OrgLicensesDetails> {
    const organizationSubscriptions = await this._organizationRepository.find({
      tenantId,
    });
    return new OrgLicensesDetails();
  }
}
