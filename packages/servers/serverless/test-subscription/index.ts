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
  const subscriptionController = new SubscriptionController(
    appConfig,
    context.log
  );
  // we need to create a page that calls that api and returns response to user!
  if (req?.query?.token) {
    await subscriptionController.resolveSubscription(req.query.token);
  }
  //can we give it different endPoint?
  if (req?.body?.action === "Unsubscribe") {
    await subscriptionController.unsubscribe(req?.body?.subscription);
  }

  context.res = {
    status: 200,
    body: "",
  };
};

export default httpTrigger;
