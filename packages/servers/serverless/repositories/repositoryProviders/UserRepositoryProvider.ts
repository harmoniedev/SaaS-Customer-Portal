import { DbTypes, IUser } from "../../entities";
import { BaseRepository } from "../baseRepository";
import UserRepository from "../mongoRepositories/UserRepository";

export class UserRepositoryProvider {
  private static _userRepository: BaseRepository<IUser>;
  private static _dbType: DbTypes;
  private static createRepository(dbType: DbTypes) {
    switch (dbType) {
      case DbTypes.mongoose:
        return (this._userRepository = new UserRepository());
      default:
        return new UserRepository();
    }
  }
  static initRepository(dbType: DbTypes) {
    if (this._dbType === dbType && this._userRepository) {
      return this._userRepository;
    }
    this._dbType = dbType;
    return this.createRepository(dbType);
  }
}
