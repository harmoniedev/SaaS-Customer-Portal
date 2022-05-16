export interface IReadRepository {
  find<TContext, TResults>(model: any, query: any): Promise<TResults[]>;
  findOne<TContext, TResults>(model: any, query: any): Promise<TResults>;
  findOneById<TContext, TResults>(model: any, id: string): Promise<TResults>;
}
