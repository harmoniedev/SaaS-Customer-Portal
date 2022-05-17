export interface IWriteService {
  create<TRequest>(item: TRequest): Promise<boolean>;
  update<TResult>(_id: string, item: TResult): Promise<TResult>;
  delete: (_id: string) => Promise<boolean>;
}
