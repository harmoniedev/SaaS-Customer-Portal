export interface IUser {
  _id?: string;
  tenantId?: string;
  userId?: string;
  upn?: string;
  firstUsage?: Date;
  lastUsage?: Date;
  name?: string;
  //owner and?
  cp_role?: string;
  //planId from subscription
  licenseType?: string;
}
