import { EditUser, IUser, ViewUser } from "../../../entities";

export interface IUserService {
  editUser(
    tenantId: string,
    userId: string,
    userPayload: EditUser
  ): Promise<boolean>;
  deleteUser(tenantId: string, userId: string): Promise<boolean>;
  getAllUsers(tenantId: string, orderBy: string): Promise<ViewUser[]>;
}
