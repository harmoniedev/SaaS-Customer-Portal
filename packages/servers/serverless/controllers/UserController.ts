import { Logger } from "@azure/functions";
import { IConfig } from "../entities";
import { IUser } from "../entities/interfaces";
import { EditUser, ViewUser } from "../entities/uiModels/user";
import { IUserService, UserService } from "../services";
export class UserController {
  private readonly _userService: IUserService;
  private readonly _configuration: IConfig;
  private _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._userService = new UserService(this._configuration);
  }
  async createUser(tenantId: string, userId: string): Promise<boolean> {
    return true;
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
      const users: IUser[] = await this._userService.getAllUsers(
        tenantId,
        orderBy
      );
      this._logger.info(`[UserController - getAllUsers] finish ${logMessage}`);
      return users.map((user: IUser) => new ViewUser(user));
    } catch (error: any) {
      this._logger.error(
        `[UserController - getAllUsers] error ${logMessage}, error: ${error.message}`
      );
      throw error;
    }
  }
}
