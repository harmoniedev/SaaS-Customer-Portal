import { Logger } from "@azure/functions";
import {
  IUser,
  EditUser,
  IConfig,
  ViewUser,
  AddUserView,
  ISubscription,
  SortQuery,
} from "../../entities";
import { BaseRepository, UserRepositoryProvider } from "../../repositories";
import { defaultLicense } from "../../utils";
import { BaseService } from "../base/BaseService";
import { ISubscriptionService, IUserService } from "../interfaces";
import { SubscriptionService } from "./SubscriptionService";

export class UserService extends BaseService implements IUserService {
  private readonly _subscriptionService: ISubscriptionService;
  private readonly _userRepository: BaseRepository<IUser>;
  constructor(configuration: IConfig, log: Logger) {
    super(configuration, log);
    this._userRepository = UserRepositoryProvider.initRepository(
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
      await this.isUserExists(
        {
          tenantId,
          upn: email,
        },
        logMessage
      );
      const userToSave: IUser = userPayload.toDataBaseModel();
      if (license !== defaultLicense) {
        const validSubscription = await this.addSubscription(tenantId);
        if (validSubscription) {
          userToSave.subscriptionId = validSubscription.id;
          userToSave.license = validSubscription.planId;
        }
      }
      await this._userRepository.create(userToSave);
    } catch (error) {
      this._logger.error(`[UserService - createUser] error ${logMessage}`);
      throw error;
    }
    this._logger.info(`[UserService - createUser] finish ${logMessage}`);
    return true;
  }

  private async isUserExists(
    query: { [key: string]: any },
    logMessage: string
  ) {
    const isUserExists = await this._userRepository.findOne<IUser>(query);
    if (isUserExists) {
      this._logger.error(
        `[UserService - createUser] error ${logMessage}, error: user already exists`
      );
      throw new Error("user already exists");
    }
  }

  private async addSubscription(tenantId: string): Promise<ISubscription> {
    const logMessage = `for tenantId ${tenantId}`;
    try {
      this._logger.info(`[UserService - addSubscription] start ${logMessage}`);
      const validSubscription =
        await this._subscriptionService.getValidSubscription(tenantId);
      if (validSubscription) {
        this._logger.info(
          `[UserService - addSubscription] found valid subscription for ${logMessage}, ${JSON.stringify(
            validSubscription
          )}`
        );
        return validSubscription;
      }
    } catch (error: any) {
      this._logger.error(
        `[UserService - addSubscription] error ${logMessage}, error: ${error.message}`
      );
      throw error;
    }
  }

  async editUser(
    tenantId: string,
    userId: string,
    userPayload: EditUser
  ): Promise<boolean> {
    const callerName = `[UserService -  editUser]`;
    const logMessage = ` for tenantId ${tenantId}, user id ${userId}, userPayload ${JSON.stringify(
      userPayload
    )}`;
    await this.isUserExists(
      {
        tenantId,
        upn: userPayload.email,
        _id: { $ne: userId },
      },
      logMessage
    );
    this._logger.info(`${callerName} start ${logMessage}`);
    const userToEdit: IUser = userPayload.toDataBaseModel() as any;
    if (userPayload.license !== defaultLicense) {
      const validSubscription = await this.addSubscription(tenantId);
      if (validSubscription) {
        userToEdit.subscriptionId = validSubscription.id;
        userToEdit.license = validSubscription.planId;
      }
    }
    const updateResult: IUser = await this._userRepository.findOneAndUpdate(
      { tenantId, _id: userId },
      userToEdit
    );
    this._logger.info(`${callerName} finish ${logMessage}`);
    return !!updateResult;
  }

  async deleteSubscriptionFromUser(
    tenantId: string,
    userId: string
  ): Promise<boolean> {
    const userToEdit: IUser = { license: defaultLicense, role: "" };
    return !!(await this._userRepository.findOneAndUpdate(
      { tenantId, _id: userId },
      userToEdit
    ));
  }

  async getAllUsers(
    tenantId: string,
    sortQuery: SortQuery
  ): Promise<ViewUser[]> {
    const logMessage = `for tenantId ${tenantId}, sortQuery ${JSON.stringify(
      sortQuery
    )} dateTime ${new Date().toISOString()}`;
    let users: IUser[];
    this._logger.info(`[UserService - getAllUsers] start ${logMessage}`);
    try {
      users = await this._userRepository.find(
        { tenantId },
        sortQuery.createQuery()
      );
    } catch (error: any) {
      this._logger.error(
        `[UserService - getAllUsers] ${logMessage},error ${error.message}`
      );
      throw error;
    }
    this._logger.info(`[UserService - getAllUsers] finish ${logMessage}`);
    return users?.map((user: IUser) => new ViewUser(user)) || [];
  }
}
