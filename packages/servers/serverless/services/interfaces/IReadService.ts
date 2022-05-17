export interface IReadService {
  findAll<TResult>(): Promise<TResult[]>;
  findById<TResult>(_id: string): Promise<TResult>;
  findOne<TResult>(query: { [key: string]: any }): Promise<TResult>;
}
