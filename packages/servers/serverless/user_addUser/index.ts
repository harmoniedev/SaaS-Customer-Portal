import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  OrganizationController,
  SubscriptionController,
  UserController,
} from "../controllers";
import { ErrorResponse } from "../entities";
import { AppLoader } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { log } = context;
  const { appConfig, reqValidationResults } = await AppLoader.initApp(
    req,
    true
  );
  if (reqValidationResults.status !== 200) {
    context.res = {
      status: reqValidationResults.status,
      body: reqValidationResults.message,
    };
    return;
  }
  const userController = new UserController(appConfig, log);
  let response = {};
  if (req?.query?.tid) {
    try {
      response = await userController.createUser(req.query.tid, req.body);
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
      error: "Missing tid query parameter",
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
