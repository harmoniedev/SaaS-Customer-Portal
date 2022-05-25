import { DbTypes, IOrganization } from "../../entities";
import { BaseRepository } from "../baseRepository";
import { OrganizationRepository } from "../mongooseRepositories";

export class OrganizationRepositoryFactory {
  private _organizationRepository: BaseRepository<IOrganization>;
  private _dbType: DbTypes;
  private createRepository(dbType: DbTypes) {
    switch (dbType) {
      case DbTypes.mongoose:
        return new OrganizationRepository();
      default:
        return new OrganizationRepository();
    }
  }

  initRepository(dbType: DbTypes) {
    if (this._dbType === dbType && this._organizationRepository) {
      return this._organizationRepository;
    }
    this._dbType === dbType;
    return this.createRepository(dbType);
  }
}
