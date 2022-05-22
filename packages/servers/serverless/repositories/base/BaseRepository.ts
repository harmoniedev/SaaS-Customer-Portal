import { IReadRepository, IWriteRepository } from "../interfaces";

export abstract class BaseRepository<T>
  implements IWriteRepository, IReadRepository
{
  create<TResults>(item: TResults): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update<TResults>(id: string, item: TResults): Promise<TResults> {
    throw new Error("Method not implemented.");
  }
  findOneAndUpdate<TResults>(
    query: { [ket: string]: any },
    item: TResults
  ): Promise<TResults> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  find<TResults>(
    query: any,
    sort?: { [key: string]: any }
  ): Promise<TResults[]> {
    throw new Error("Method not implemented.");
  }
  findOne<TResults>(query: any): Promise<TResults> {
    throw new Error("Method not implemented.");
  }
  findOneById<TResults>(id: string): Promise<TResults> {
    throw new Error("Method not implemented.");
  }
}
