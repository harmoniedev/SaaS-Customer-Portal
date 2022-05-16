import { IWriteRepository, IReadRepository } from "../interfaces";
import { Model, Connection } from "mongoose";

export class BaseRepository implements IWriteRepository, IReadRepository {
  private readonly _connection: Connection;
  constructor(connection: Connection) {
    this._connection = connection;
    const t = this._connection;
    console.log({ t });
  }
  async create<TResults>(modelName: string, item: TResults): Promise<boolean> {
    const result: any = await this._connection.models[modelName].create(item);
    return !!result.insertedId;
  }

  async update<TResults>(
    modelName: string,
    id: string,
    item: TResults
  ): Promise<TResults> {
    return await this._connection.models[modelName].findByIdAndUpdate(id, item);
  }

  async delete(modelName: string, id: string): Promise<boolean> {
    return await this._connection.models[modelName].findByIdAndDelete(id);
  }

  async find<TResults>(modelName: string, query: any): Promise<TResults[]> {
    return await this._connection.models[modelName].findByIdAndUpdate(query);
  }

  async findOne<TResults>(modelName: string, query: any): Promise<TResults> {
    return await this._connection.models[modelName].findOne(query);
  }

  async findOneById<TResults>(
    modelName: string,
    id: string
  ): Promise<TResults> {
    return await this._connection.models[modelName].findById(id);
  }
}
