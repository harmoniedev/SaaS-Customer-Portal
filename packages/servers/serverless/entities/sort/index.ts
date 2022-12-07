import { SortDirection } from "../enums";

export class SortQuery {
  private readonly _direction: number;
  private readonly _propertyName: string;
  constructor(direction: string, propertyName: string) {
    this._direction =
      direction === "desc" ? SortDirection.DESC : SortDirection.ASC;
    this._propertyName = propertyName;
  }
  createQuery() {
    return { [this._propertyName]: this._direction };
  }
}
