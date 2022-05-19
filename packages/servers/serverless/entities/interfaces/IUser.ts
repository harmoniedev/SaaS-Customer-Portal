export interface IUser {
  _id?: string;
  tenantId?: string;
  userId?: string;
  upn?: string;
  firstUsage?: Date;
  lastUsage?: Date;
  name?: string;
  role?: string;
  license?: string;
  subscriptionId?: string;
}
