import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  OrganizationController,
  SubscriptionController,
  UserController,
} from "../controllers";
import { ErrorResponse } from "../entities";
import { InitializedApp } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { log } = context;
  const { appConfig } = await InitializedApp.initializedApp();
  const userController = new UserController(appConfig, log);
  let response = {};
  if (req?.query?.tenantId && req?.query?.userId) {
    try {
      response = await userController.deleteSubscriptionFromUser(
        req.query.tenantId,
        req.query.userId
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
    const tenantId = req?.query?.tenantId;
    const userId = req?.query?.userId;
    const errorMessage: ErrorResponse = {
      error: `Missing following query parameters ${
        tenantId ? "" : "tenantId"
      }, ${userId ? "" : "userId"}`,
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
