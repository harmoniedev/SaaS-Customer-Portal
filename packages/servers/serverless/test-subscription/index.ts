import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  OrganizationController,
  SubscriptionController,
  UserController,
} from "../controllers";
import { EditUser } from "../entities";
import { InitializedApp } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { appConfig } = await InitializedApp.initializedApp();
  let _logger = context.log;
  const subscriptionController = new SubscriptionController(appConfig, _logger);
  await subscriptionController.resolveSubscription(req.query.token);
  _logger = null;
  context.res = {
    status: 200,
    body: "",
  };
};

export default httpTrigger;
