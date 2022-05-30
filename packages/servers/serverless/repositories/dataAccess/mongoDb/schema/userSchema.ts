import { Schema, model } from "mongoose";
import { IUser } from "../../../../entities";

const userSchema = new Schema<IUser>({
  tenantId: String,
  userId: String,
  upn: { type: String, required: true },
  firstUsage: Date,
  lastUsage: Date,
  name: String,
  role: String,
  license: String,
  subscriptionId: String,
});

export const UserModel = model<IUser>("User", userSchema);
