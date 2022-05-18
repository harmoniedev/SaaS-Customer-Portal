import { DataAccessFactory } from "../dataAccess/DataAccessFactory/DataAccessFactory";
import { DbTypes } from "../entities";

export class InitializedApp {
  static async initializedApp() {
    const dbTypes: DbTypes = DbTypes[process.env.DbTypes];
    await DataAccessFactory.initDataAccess(
      dbTypes,
      process.env.DB_CONNECTION_STRING
    );
    return { dbTypes };
  }
}
