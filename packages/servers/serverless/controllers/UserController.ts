import { Logger } from "@azure/functions";
import { IConfig } from "../entities";
import { IUser } from "../entities/interfaces";
import { EditUser } from "../entities/uiModels/user";
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

  async getAllUsers(tenantId: string): Promise<IUser[]> {
    return await this._userService.getAllUsers(tenantId);
  }
}
