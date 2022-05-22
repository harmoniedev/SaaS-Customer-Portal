import { Logger } from "@azure/functions";
import {
  IUser,
  EditUser,
  IConfig,
  ViewUser,
  AddUserView,
  ISubscription,
} from "../../entities";
import { BaseRepository, UserRepositoryFactory } from "../../repositories";
import { defaultLicense } from "../../utils";
import { ISubscriptionService, IUserService } from "../interfaces";
import { SubscriptionService } from "./SubscriptionService";

export class UserService implements IUserService {
  private readonly _subscriptionService: ISubscriptionService;
  private readonly _userRepository: BaseRepository<IUser>;
  private readonly _userFactory = new UserRepositoryFactory();
  private readonly _configuration: IConfig;
  private readonly _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._userRepository = this._userFactory.initRepository(
      this._configuration.dbType
    );
    this._subscriptionService = new SubscriptionService(
      this._configuration,
      this._logger
    );
  }
  async createUser(
    tenantId: string,
    userPayload: AddUserView
  ): Promise<boolean> {
    const logMessage = `for tenantId ${tenantId}, payload ${JSON.stringify(
      userPayload
    )}`;
    const { email, license } = userPayload;
    this._logger.info(`[UserService - createUser] start ${logMessage}`);
    try {
      const isUserExists = await this._userRepository.findOne<IUser>({
        tenantId,
        upn: email,
      });
      if (isUserExists) {
        this._logger.error(
          `[UserService - createUser] error ${logMessage}, error: user already exists`
        );
        throw new Error("user already exists");
      }
      const userToSave: IUser = userPayload.toDataBaseModel();
      if (license !== defaultLicense) {
        await this.addSubscription(tenantId, userToSave);
      }
    } catch (error) {
      this._logger.error(`[UserService - createUser] error ${logMessage}`);
      throw error;
    }
    this._logger.info(`[UserService - createUser] finish ${logMessage}`);
    return true;
  }

  private async addSubscription(tenantId: string, userToSave: IUser) {
    const logMessage = `for tenantId ${tenantId}`;
    try {
      this._logger.info(
        `[UserService - addSubscription] start ${logMessage}, userToSave pre save data: ${JSON.stringify(
          userToSave
        )}`
      );
      const validSubscription =
        await this._subscriptionService.getValidSubscription(tenantId);
      if (validSubscription) {
        userToSave.subscriptionId = validSubscription.id;
        userToSave.license = validSubscription.planId;
        this._logger.info(
          `[UserService - addSubscription] found valid subscription for ${logMessage}, userToSave post save data: ${JSON.stringify(
            userToSave
          )}, ${JSON.stringify(validSubscription)}`
        );
        await this._userRepository.create(userToSave);
      }
    } catch (error: any) {
      this._logger.error(
        `[UserService - addSubscription] error ${logMessage},, userToSave data: ${JSON.stringify(
          userToSave
        )}, error: ${error.message}`
      );
      throw error;
    }
    this._logger.info(`[UserService - addSubscription] finish ${logMessage}`);
  }

  async editUser(
    tenantId: string,
    userId: string,
    userPayload: EditUser
  ): Promise<boolean> {
    const userToEdit: IUser = userPayload.toDataBaseModel() as any;
    //need to check if that user have subscription if not we need to add one

    // do we need to update subscription
    const updateResult: IUser = await this._userRepository.findOneAndUpdate(
      { tenantId, userId },
      userToEdit
    );
    return !!updateResult;
  }

  async deleteUser(tenantId: string, userId: string): Promise<boolean> {
    const userToEdit: IUser = { license: defaultLicense, role: "" };
    return !!(await this._userRepository.findOneAndUpdate(
      { tenantId, userId },
      userToEdit
    ));
  }

  async getAllUsers(tenantId: string, orderBy: string): Promise<ViewUser[]> {
    const sortQuery =
      orderBy === "lastActive" ? { lastActive: -1 } : { name: -1 };
    const logMessage = `for tenantId ${tenantId}, sortQuery ${JSON.stringify(
      sortQuery
    )} dateTime ${new Date().toISOString()}`;
    let users: IUser[];
    this._logger.info(`[UserService - getAllUsers] start ${logMessage}`);
    try {
      users = await this._userRepository.find({ tenantId }, sortQuery);
    } catch (error: any) {
      this._logger.error(
        `[UserService - getAllUsers] ${logMessage},error ${error.message}`
      );
      throw error;
    }
    this._logger.info(`[UserService - getAllUsers] finish ${logMessage}`);
    return users.map((user: IUser) => new ViewUser(user));
  }
}
