import { appConfig } from ".";
import { HttpRequest } from "@azure/functions";
import { AuthenticationProvider } from "./authentication";
import { AuthenticationResult } from "../entities";
import { DataAccessFactory } from "../repositories/dataAccess/DataAccessFactory/DataAccessFactory";
export class AppLoader {
  static async initApp(req: HttpRequest, authenticateRequest: boolean) {
    let reqValidationResults: AuthenticationResult;
    if (authenticateRequest) {
      reqValidationResults = await AuthenticationProvider.validateRequest(
        req?.headers
      );
    }
    await DataAccessFactory.initDataAccess(
      appConfig.dbType,
      process.env.DB_CONNECTION_STRING
    );
    return { appConfig, reqValidationResults };
  }
}
