import { Schema, model } from "mongoose";
import { IUser } from "../../../entities";

const userSchema = new Schema<IUser>({
  tenantId: String,
  userId: String,
  upn: { type: String, required: true },
  firstUsage: Date,
  lastUsage: Date,
  name: String,
  cp_role: String,
  licenseType: String,
});

export const UserModel = model<IUser>("User", userSchema);
