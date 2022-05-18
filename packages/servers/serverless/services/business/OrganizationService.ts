import { DbTypes, IOrganization, OrgLicensesDetails } from "../../entities";
import {
  OrganizationRepositoryFactory,
  BaseRepository,
} from "../../repositories";
import { IOrganizationService } from "../interfaces";

export class OrganizationService implements IOrganizationService {
  private readonly _organizationRepository: BaseRepository<IOrganization>;
  private readonly _organizationFactory = new OrganizationRepositoryFactory();
  constructor(dbType: DbTypes) {
    this._organizationRepository =
      this._organizationFactory.initRepository(dbType);
  }
  async getOrgLicenses(tenantId: string): Promise<OrgLicensesDetails> {
    const organizationSubscriptions = await this._organizationRepository.find({
      tenantId,
    });
    return new OrgLicensesDetails();
  }
}
