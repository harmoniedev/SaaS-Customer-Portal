export interface IWriteRepository {
  create<TResults>(item: TResults): Promise<boolean>;
  update<TResults>(id: string, item: TResults): Promise<TResults>;
  findOneAndUpdate<TResults>(id: string, item: TResults): Promise<TResults>;
  delete(id: string): Promise<boolean>;
}
