import { appConfig } from ".";
import { HttpRequest } from "@azure/functions";
import { AuthenticationProvider } from "./authentication";
import { AuthenticationResult } from "../entities";

export class AppLoader {
  static async initApp(req: HttpRequest, authenticateRequest: boolean) {
    let reqValidationResults: AuthenticationResult;
    if (authenticateRequest) {
      reqValidationResults = await AuthenticationProvider.validateRequest(
        req?.headers
      );
    }
    return { appConfig, reqValidationResults };
  }
}
