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
  const { appConfig, isValidRequest } = await AppLoader.initApp(req);
  if (!isValidRequest) {
    context.res = {
      status: 500,
      body: "user not authenticate",
    };
  }
  const userController = new UserController(appConfig, log);
  let response = {};
  if (req?.query?.tid && req?.query?.userId) {
    try {
      response = await userController.editUser(
        req.query.tid,
        req.query.userId,
        req.body
      );
    } catch (error: any) {
      context.log.error(`[user_editUser] error: ${error.message}`);
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
    const tid = req?.query?.tid;
    const userId = req?.query?.userId;
    const errorMessage: ErrorResponse = {
      error: `Missing following query parameters ${tid ? "" : "tid"}, ${
        userId ? "" : "userId"
      }`,
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
