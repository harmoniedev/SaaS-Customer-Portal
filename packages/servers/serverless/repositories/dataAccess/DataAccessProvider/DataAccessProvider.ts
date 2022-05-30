import { DbTypes } from "../../../entities";
import MongoStorage from "../mongoDb";

export class DataAccessFactory {
  private static async createDataAccess(
    dbType: DbTypes,
    connectionString: string
  ) {
    switch (dbType) {
      case DbTypes.mongoose:
        return await MongoStorage.init(connectionString);
      default:
        return await MongoStorage.init(connectionString);
    }
  }
  static async initDataAccess(dbType: DbTypes, connectionString: string) {
    return await this.createDataAccess(dbType, connectionString);
  }
}
