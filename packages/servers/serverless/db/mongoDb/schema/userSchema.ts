import { Schema, model } from "mongoose";
import { IUser } from "../../../entities/interfaces/IUser";

const userSchema = new Schema<IUser>({
  tenantId: String,
  userId: String,
  teamsUserId: String,
  redirectUri: String,
  upn: { type: String, required: true },
  domain: String,
  refreshToken: String,
  token: String,
  tokenExpiration: Date,
  digestSendTime: { type: Date, default: null },
  emailsShared: Number,
  walkthroughCompleted: { type: Boolean, default: false },
  geography: {
    type: Schema.Types.ObjectId,
    ref: "Geography",
  },
  firstUsage: Date,
  lastUsage: Date,
  name: String,
  emailSignature: String,
  isNotifyOnCreateTask: Boolean,
  settings: [{ type: Schema.Types.ObjectId, ref: "Settings" }],
});

export const UserModel = model<IUser>("User", userSchema);
