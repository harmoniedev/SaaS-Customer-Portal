import { DbTypes } from "../../entities";
import MongoStorage from "../mongoDb/MongoStorage";

export class DataAccessFactory {
  private _dbType: DbTypes;
  private async createDataAccess(dbType: DbTypes, connectionString: string) {
    switch (dbType) {
      case DbTypes.mongoose:
        return await MongoStorage.init(connectionString);
      default:
        return await MongoStorage.init(connectionString);
    }
  }
  async initDataAccess(dbType: DbTypes, connectionString: string) {
    if (this._dbType === dbType) {
    }
    this._dbType === dbType;
    return await this.createDataAccess(dbType, connectionString);
  }
}
