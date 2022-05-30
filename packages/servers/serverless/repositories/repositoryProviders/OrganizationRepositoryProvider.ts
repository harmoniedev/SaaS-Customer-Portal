import { DbTypes, IOrganization } from "../../entities";
import { BaseRepository } from "../baseRepository";
import { OrganizationRepository } from "../mongoRepositories";

export class OrganizationRepositoryProvider {
  private static _organizationRepository: BaseRepository<IOrganization>;
  private static _dbType: DbTypes;
  private static createRepository(dbType: DbTypes) {
    switch (dbType) {
      case DbTypes.mongoose:
        return (this._organizationRepository = new OrganizationRepository());
      default:
        return new OrganizationRepository();
    }
  }

  static initRepository(dbType: DbTypes) {
    if (this._dbType === dbType && this._organizationRepository) {
      return this._organizationRepository;
    }
    this._dbType = dbType;
    return this.createRepository(dbType);
  }
}
