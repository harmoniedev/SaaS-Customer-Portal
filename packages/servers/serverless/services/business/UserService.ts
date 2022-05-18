import { DbTypes, IOrganization, IUser, EditUser } from "../../entities";
import {
  BaseRepository,
  OrganizationRepositoryFactory,
  UserRepositoryFactory,
} from "../../repositories";
import { IUserService } from "../interfaces";

export class UserService implements IUserService {
  private readonly _userRepository: BaseRepository<IUser>;
  private readonly _organizationRepository: BaseRepository<IOrganization>;
  private readonly _userFactory = new UserRepositoryFactory();
  private readonly _organizationFactory = new OrganizationRepositoryFactory();

  constructor(dbType: DbTypes) {
    this._userRepository = this._userFactory.initRepository(dbType);
    this._organizationRepository =
      this._organizationFactory.initRepository(dbType);
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
    const userToEdit: IUser = { licenseType: "FREE", cp_role: "" };
    return !!(await this._userRepository.findOneAndUpdate(
      { tenantId, userId },
      userToEdit
    ));
  }

  async getAllUsers(tenantId: string): Promise<IUser[]> {
    const response: IUser[] = await this._userRepository.find({ tenantId });
    return response;
  }
}
