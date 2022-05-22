import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { SubscriptionController } from "../controllers";
import { InitializedApp } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { log } = context;
  const { appConfig } = await InitializedApp.initializedApp();
  log.info(
    `[purchase-subscription] func start with dbType: ${
      appConfig.dbType
    }, Date ${new Date().toISOString()}`
  );
  const subscriptionController = new SubscriptionController(appConfig, log);
  if (req?.body?.action === "Unsubscribe") {
    await subscriptionController.unsubscribe(req?.body?.subscription);
  }
  log.info(
    `[purchase-subscription] func finish, Date ${new Date().toISOString()}`
  );

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "",
  };
};

export default httpTrigger;
