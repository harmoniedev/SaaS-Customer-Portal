import UserRepository from "../../repositories/mongooseRepositories/UserRepository";
import { IReadService, IWriteService } from "../interfaces";
// import { IUser } from "../../entities/interfaces";

export class UserService implements IWriteService, IReadService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  async findAll<IUser>(): Promise<IUser[]> {
    const response: IUser[] = await this._userRepository.find({});
    return response;
  }

  async findById<IUser>(_id: string): Promise<IUser> {
    return await this._userRepository.findOneById(_id);
  }

  async findOne<IUser>(query: { [key: string]: any }): Promise<IUser> {
    return await this._userRepository.findOne(query);
  }

  async create<IUser>(item: IUser): Promise<boolean> {
    return await this._userRepository.create(item);
  }

  async update<IUser>(_id: string, item: IUser): Promise<IUser> {
    return await this._userRepository.update(_id, item);
  }

  async delete(_id: string): Promise<boolean> {
    return await this._userRepository.delete(_id);
  }
}
