export interface IRepository<T> {
  getAll(filter: any): Promise<T[]> | T[];
  getById(id: string): Promise<T> | T;
  save(entity: T): Promise<void> | void;
  remove(entity: T): Promise<void> | void;
}
