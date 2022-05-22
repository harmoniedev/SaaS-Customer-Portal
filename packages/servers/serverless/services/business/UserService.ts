import { Logger } from "@azure/functions";
import {
  IOrganization,
  IUser,
  EditUser,
  IConfig,
  ViewUser,
} from "../../entities";
import {
  BaseRepository,
  OrganizationRepositoryFactory,
  UserRepositoryFactory,
} from "../../repositories";
import { IUserService } from "../interfaces";

export class UserService implements IUserService {
  private readonly _userRepository: BaseRepository<IUser>;
  private readonly _userFactory = new UserRepositoryFactory();
  private readonly _organizationFactory = new OrganizationRepositoryFactory();
  private readonly _organizationRepository: BaseRepository<IOrganization>;
  private readonly _configuration: IConfig;
  private readonly _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._userRepository = this._userFactory.initRepository(
      this._configuration.dbType
    );
    this._organizationRepository = this._organizationFactory.initRepository(
      this._configuration.dbType
    );
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
    const userToEdit: IUser = { license: "FREE", role: "" };
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
