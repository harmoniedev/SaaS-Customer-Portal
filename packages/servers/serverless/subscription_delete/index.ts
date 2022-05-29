import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { SubscriptionController } from "../controllers";
import { AppLoader } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { log } = context;
  const { appConfig } = await AppLoader.initApp(req, false);

  log.info(
    `[purchase-subscription] func start with dbType: ${
      appConfig.dbType
    }, Date ${new Date().toISOString()}`
  );
  const subscriptionController = new SubscriptionController(appConfig, log);
  await subscriptionController.updateSubscriptionState(
    req?.body?.action,
    req?.body
  );
  log.info(
    `[purchase-subscription] func finish, Date ${new Date().toISOString()}`
  );

  context.res = {
    status: 200,
    body: "",
  };
};

export default httpTrigger;
