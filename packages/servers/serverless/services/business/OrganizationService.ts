import { OrgLicensesDetails } from "../../entities";
import { OrganizationRepository } from "../../repositories/mongooseRepositories";
import { IOrganizationService } from "../interfaces";

export class OrganizationService implements IOrganizationService {
  private readonly _organizationRepository: OrganizationRepository;
  constructor() {
    this._organizationRepository = new OrganizationRepository();
  }
  async getOrgLicenses(tenantId: string): Promise<OrgLicensesDetails> {
    const organizationSubscriptions = await this._organizationRepository.find({
      tenantId,
    });
    return new OrgLicensesDetails();
  }
}
