import { IWriteRepository, IReadRepository } from "../../interfaces";
import { Model } from "mongoose";
import { BaseRepository } from "../../baseRepository/BaseRepository";
import { DataAccessFactory } from "../../dataAccess/DataAccessProvider/DataAccessProvider";
import { appConfig } from "../../../utils";

export class MongooseRepository<T> extends BaseRepository<T> {
  private _model: Model<T>;

  constructor(schemaModel: Model<T>) {
    super();
    MongooseRepository.initDb();
    this._model = schemaModel;
  }
  static async initDb() {
    await DataAccessFactory.initDataAccess(
      appConfig.dbType,
      process.env.DB_CONNECTION_STRING
    );
  }
  async findOneAndUpdate<TResults>(
    query: any,
    item: TResults
  ): Promise<TResults> {
    return await this._model.findOneAndUpdate(
      query,
      { $set: item },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
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

  async find<TResults>(
    query: any,
    sortQuery?: { [key: string]: any }
  ): Promise<TResults[]> {
    if (sortQuery) {
      const t = (await this._model.find(query).sort(sortQuery)) as any;
      return t;
    }
    return await this._model.find(query);
  }

  async findOne<TResults>(query: any): Promise<TResults> {
    return await this._model.findOne(query);
  }

  async findOneById<TResults>(id: string): Promise<TResults> {
    return await this._model.findById(id);
  }
}
