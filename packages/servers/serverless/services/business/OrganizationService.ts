import { OrganizationRepository } from "../../repositories/mongooseRepositories";
import { IReadService, IWriteService } from "../interfaces";
// import { IUser } from "../../entities/interfaces";

export class OrganizationService implements IWriteService, IReadService {
  private _organizationRepository: OrganizationRepository;

  constructor() {
    this._organizationRepository = new OrganizationRepository();
  }

  async findAll<IUser>(): Promise<IUser[]> {
    const response: IUser[] = await this._organizationRepository.find({});
    return response;
  }

  async findById<IUser>(_id: string): Promise<IUser> {
    return await this._organizationRepository.findOneById(_id);
  }

  async findOne<IUser>(query: { [key: string]: any }): Promise<IUser> {
    return await this._organizationRepository.findOne(query);
  }

  async create<IUser>(item: IUser): Promise<boolean> {
    return await this._organizationRepository.create(item);
  }

  async update<IUser>(_id: string, item: IUser): Promise<IUser> {
    return await this._organizationRepository.update(_id, item);
  }

  async delete(_id: string): Promise<boolean> {
    return await this._organizationRepository.delete(_id);
  }
}
