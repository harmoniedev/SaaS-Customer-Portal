import { AddUserView, EditUser, ViewUser, SortQuery } from "../../../entities";

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
  getAllUsers(tenantId: string, sortQuery: SortQuery): Promise<ViewUser[]>;
}
