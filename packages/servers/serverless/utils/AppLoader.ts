import { DataAccessFactory } from "../repositories/dataAccess/DataAccessFactory/DataAccessFactory";
import { appConfig } from ".";
import { HttpRequest } from "@azure/functions";
import { AuthenticationProvider } from "./authentication";
export class AppLoader {
  static async initApp(req: HttpRequest) {
    const isValidRequest = await AuthenticationProvider.validateRequest(
      req?.headers
    );
    await DataAccessFactory.initDataAccess(
      appConfig.dbType,
      process.env.DB_CONNECTION_STRING
    );
    return { appConfig, isValidRequest };
  }
}
