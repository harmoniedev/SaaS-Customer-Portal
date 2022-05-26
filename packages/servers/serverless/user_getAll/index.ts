import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  OrganizationController,
  SubscriptionController,
  UserController,
} from "../controllers";
import { ErrorResponse } from "../entities";
import { AppLoader, AuthenticationProvider } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { log } = context;
  const { appConfig } = await AppLoader.initApp();
  const authenticationProvider = new AuthenticationProvider(appConfig);
  const token = req?.headers?.authorization || "";
  await authenticationProvider.validateRequest(token?.replace("Bearer ", ""));
  const userController = new UserController(appConfig, log);
  let response = {};
  if (req?.query?.tid) {
    try {
      response = await userController.getAllUsers(
        req.query.tid,
        req.query.orderby,
        req.query.direction
      );
    } catch (error: any) {
      const errorMessage: ErrorResponse = {
        error: "Something want wrong please try again later",
      };
      context.res = {
        status: 500,
        body: errorMessage,
      };
      return;
    }
  } else {
    const errorMessage: ErrorResponse = {
      error: "Missing tenantId query parameter",
    };
    context.res = {
      status: 404,
      body: errorMessage,
    };
    return;
  }

  context.res = {
    status: 200,
    body: response,
  };
};

export default httpTrigger;
