import { IUser, Role } from "../../entities";

export const defaultLicense: string = "FREE";
export const defaultUserSubscription: IUser = {
  role: Role.Member,
  subscriptionId: "",
  license: defaultLicense,
};
