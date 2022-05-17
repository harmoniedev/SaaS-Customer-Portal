import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import MongoStorage from "../db/mongoDb/MongoStorage";
import UserRepository from "../repositories/mongooseRepositories/UserRepository";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await MongoStorage.init(process.env.DB_CONNECTION_STRING);
  const userRepository = new UserRepository();
  try {
    const user = await userRepository.find({});
    console.log({ user });
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
