import { AddUserView, EditUser, ViewUser } from "../../../entities";

export interface IUserService {
  editUser(
    tenantId: string,
    userId: string,
    userPayload: EditUser
  ): Promise<boolean>;
  createUser(tenantId: string, userPayload: AddUserView): Promise<boolean>;
  deleteSubscriptionFromUser(
    tenantId: string,
    userId: string
  ): Promise<boolean>;
  getAllUsers(tenantId: string, orderBy: string): Promise<ViewUser[]>;
}
