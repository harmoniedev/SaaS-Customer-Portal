import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserController } from "../controllers";
import { EditUser } from "../entities";
import { InitializedApp } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { dbTypes } = await InitializedApp.initializedApp();
  const userController = new UserController(dbTypes);
  const editUser = new EditUser(
    "amits@harmon.ie",
    "FREE",
    "samir vladimir",
    "silver"
  );
  userController.editUser(
    "03122737-f0d8-4f00-ae32-5ff087a3db8f",
    "b8faffb9-6025-4f5c-aa13-8b975d47731e",
    editUser
  );
  try {
    // const users = await userService.findAll();
    // const user = await userService.findById("627d119662bf9a5ca84eb223");
    // const organizationId = await organizationService.create<IOrganization>({
    //   tenantId: "03122737-f0d8-4f00-ae32-5ff087a3db8f",
    //   subscription: [
    //     {
    //       id: "03122737-f0d8-4f00-ae32-5ff087a3db7h", // purchased SaaS subscription ID
    //       subscriptionName: "Contoso Cloud Solution", // SaaS subscription name
    //       offerId: "offer1", // purchased offer ID
    //       planId: "silver", // purchased offer's plan ID
    //       quantity: 20, // number of purchased seats, might be empty if the plan is not per seat
    //       subscription: {
    //         // full SaaS subscription details, see Get Subscription APIs response body for full description
    //         id: "03122737-f0d8-4f00-ae32-5ff087a3db7h",
    //         publisherId: "contoso",
    //         offerId: "offer1",
    //         name: "Contoso Cloud Solution",
    //         saasSubscriptionStatus: " PendingFulfillmentStart ",
    //         beneficiary: {
    //           emailId: "test@test.com",
    //           objectId: "<guid>",
    //           tenantId: "<guid>",
    //           pid: "<ID of the user>",
    //         },
    //         purchaser: {
    //           emailId: "test@test.com",
    //           objectId: "<guid>",
    //           tenantId: "<guid>",
    //           pid: "<ID of the user>",
    //         },
    //         planId: "silver",
    //         term: {
    //           termUnit: "P1M",
    //           startDate: new Date("2022-03-07T00:00:00Z"),
    //           endDate: new Date("2022-04-06T00:00:00Z"),
    //         },
    //         autoRenew: false,
    //         isTest: false,
    //         isFreeTrial: false,
    //         allowedCustomerOperations: ["Delete", "Update", "Read"],
    //         sandboxType: "None",
    //         lastModified: new Date(),
    //         quantity: 5,
    //         sessionMode: "None",
    //       },
    //     },
    //   ],
    // });
    // console.log({ user });
  } catch (error) {
    console.log({ error: error.message });
  }
  // const baseRepository = new BaseRepository(MongoStorage._client);
  // const tasks = baseRepository.find("tasks", {});
  // context.log({ tasks });
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

export default httpTrigger;
