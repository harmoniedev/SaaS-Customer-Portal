import { IWriteRepository, IReadRepository } from "../interfaces";
import { Model, Document } from "mongoose";

export class MongooseBaseRepository<T>
  implements IWriteRepository, IReadRepository
{
  private _model: Model<T>;

  constructor(schemaModel: Model<T>) {
    this._model = schemaModel;
  }
  async create<TResults>(item: TResults): Promise<boolean> {
    const result: any = await this._model.create(item);
    return !!result.insertedId;
  }

  async update<TResults>(id: string, item: TResults): Promise<TResults> {
    return await this._model.findByIdAndUpdate(id, item);
  }

  async delete(id: string): Promise<boolean> {
    return await this._model.findByIdAndDelete(id);
  }

  async find<TResults>(query: any): Promise<TResults[]> {
    return await this._model.find(query);
  }

  async findOne<TResults>(query: any): Promise<TResults> {
    return await this._model.findOne(query);
  }

  async findOneById<TResults>(id: string): Promise<TResults> {
    return await this._model.findById(id);
  }
}
