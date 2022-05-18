import { DbTypes } from "../entities";
import { IUser } from "../entities/interfaces";
import { EditUser } from "../entities/uiModels/user";
import { UserService } from "../services/business";

export class UserController {
  private readonly _userService: UserService;
  constructor(dbType: DbTypes) {
    this._userService = new UserService(dbType);
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
