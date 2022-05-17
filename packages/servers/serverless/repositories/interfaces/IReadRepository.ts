export interface IReadRepository {
  find<TResults>(query: any): Promise<TResults[]>;
  findOne<TResults>(query: any): Promise<TResults>;
  findOneById<TResults>(id: string): Promise<TResults>;
}
