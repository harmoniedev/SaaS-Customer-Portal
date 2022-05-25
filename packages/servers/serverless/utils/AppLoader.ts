import { DataAccessFactory } from "../repositories/dataAccess/DataAccessFactory/DataAccessFactory";
import { appConfig } from ".";
export class AppLoader {
  static async initApp() {
    await DataAccessFactory.initDataAccess(
      appConfig.dbType,
      process.env.DB_CONNECTION_STRING
    );
    return { appConfig };
  }
}
