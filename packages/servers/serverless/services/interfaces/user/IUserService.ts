import { EditUser, IUser } from "../../../entities";

export interface IUserService {
  editUser(
    tenantId: string,
    userId: string,
    userPayload: EditUser
  ): Promise<boolean>;
  deleteUser(tenantId: string, userId: string): Promise<boolean>;
  getAllUsers(tenantId: string): Promise<IUser[]>;
}
