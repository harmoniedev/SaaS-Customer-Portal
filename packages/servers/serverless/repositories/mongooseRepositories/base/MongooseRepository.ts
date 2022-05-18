import { IWriteRepository, IReadRepository } from "../../interfaces";
import { Model } from "mongoose";
import { BaseRepository } from "../../base/BaseRepository";

export class MongooseRepository<T> extends BaseRepository<T> {
  private _model: Model<T>;

  constructor(schemaModel: Model<T>) {
    super();
    this._model = schemaModel;
  }
  async findOneAndUpdate<TResults>(
    query: any,
    item: TResults
  ): Promise<TResults> {
    return await this._model.findOneAndUpdate(query, item, { new: true });
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
