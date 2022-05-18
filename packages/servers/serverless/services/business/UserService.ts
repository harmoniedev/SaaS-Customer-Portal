import { IUser } from "../../entities";
import { EditUser } from "../../entities/uiModels/user";
import { OrganizationRepository } from "../../repositories/mongooseRepositories";
import UserRepository from "../../repositories/mongooseRepositories/UserRepository";
import { IUserService } from "../interfaces";
export class UserService implements IUserService {
  private _userRepository: UserRepository;
  private _organizationRepository: OrganizationRepository;

  constructor() {
    //need to inject on runtime
    this._userRepository = new UserRepository();
    //need to inject on runtime
    this._organizationRepository = new OrganizationRepository();
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
    //delete user from subscription
    //need to update subscription amount?
    return await this._userRepository.delete("");
  }
  async getAllUsers(tenantId: string): Promise<IUser[]> {
    const response: IUser[] = await this._userRepository.find({ tenantId });
    return response;
  }
}
