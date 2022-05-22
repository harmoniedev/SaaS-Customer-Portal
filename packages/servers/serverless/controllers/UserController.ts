import { Logger } from "@azure/functions";
import { IConfig } from "../entities";
import { EditUser, ViewUser, AddUserView } from "../entities/uiModels/user";
import { IUserService, UserService } from "../services";
export class UserController {
  private readonly _userService: IUserService;
  private readonly _configuration: IConfig;
  private _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._userService = new UserService(this._configuration, this._logger);
  }
  async createUser(tenantId: string, userToAdd: AddUserView): Promise<boolean> {
    const logMessage = ` for tenantId ${tenantId}, dateTime ${new Date().toISOString()}`;
    let user;
    this._logger.info(`[UserController - createUser] start ${logMessage}`);
    try {
      user = await this._userService.createUser(
        tenantId,
        new AddUserView(
          userToAdd.license,
          userToAdd.role,
          userToAdd.email,
          userToAdd.name,
          tenantId
        )
      );
    } catch (error: any) {
      this._logger.error(
        `[UserController - createUser] error ${logMessage}, error: ${error.message}`
      );
      throw error;
    }
    this._logger.info(`[UserController - createUser] finish ${logMessage}`);
    return !!user;
  }
  async editUser(
    tenantId: string,
    userId: string,
    userPayload: EditUser
  ): Promise<boolean> {
    const user = await this._userService.editUser(
      tenantId,
      userId,
      userPayload
    );
    if (user) return true;
  }
  async deleteUser(tenantId: string, userId: string): Promise<boolean> {
    return true;
  }

  async getAllUsers(
    tenantId: string,
    orderBy: string = "name"
  ): Promise<ViewUser[]> {
    const logMessage = ` for tenantId ${tenantId}, orderBy ${orderBy} dateTime ${new Date().toISOString()}`;
    try {
      this._logger.info(`[UserController - getAllUsers] start ${logMessage}`);
      const users: ViewUser[] = await this._userService.getAllUsers(
        tenantId,
        orderBy
      );
      this._logger.info(`[UserController - getAllUsers] finish ${logMessage}`);
      return users;
    } catch (error: any) {
      this._logger.error(
        `[UserController - getAllUsers] error ${logMessage}, error: ${error.message}`
      );
      throw error;
    }
  }
}
