import { DataAccessFactory } from "../dataAccess/DataAccessFactory/DataAccessFactory";
import { DbTypes } from "../entities";
import { appConfig } from "./";
export class InitializedApp {
  static async initializedApp() {
    await DataAccessFactory.initDataAccess(
      appConfig.dbType,
      process.env.DB_CONNECTION_STRING
    );
    return { appConfig };
  }
}
