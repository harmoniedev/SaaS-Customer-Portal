export interface IWriteRepository {
  create<TResults>(model: any, item: TResults): Promise<boolean>;
  update<TResults>(model: any, id: string, item: TResults): Promise<TResults>;
  delete(model: any, id: string): Promise<boolean>;
}
