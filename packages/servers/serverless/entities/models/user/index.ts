import { IUser } from "../../interfaces";

export class AddUserView {
  license: string;
  role: string;
  email: string;
  name: string;
  tenantId: string;

  constructor(
    license: string,
    role: string,
    email: string,
    name: string,
    tenantId: string
  ) {
    this.license = license;
    this.role = role;
    this.email = email;
    this.name = name;
    this.tenantId = tenantId;
  }

  toDataBaseModel(): IUser {
    return {
      role: this.role,
      license: this.license,
      upn: this.email,
      name: this.name,
      tenantId: this.tenantId,
    };
  }
}

export class ViewUser {
  lastActiveDate?: string;
  license: string;
  role: string;
  email: string;
  name: string;
  _id: string;
  constructor(user: IUser) {
    this.email = user?.upn;
    this._id = user._id;
    this.lastActiveDate = user?.lastUsage?.toISOString();
    this.license = user?.license;
    this.name = user?.name || " ";
    this.role = user?.role;
    this.lastActiveDate = user?.lastUsage?.toISOString() ?? "Never";
  }
}
export class EditUser {
  license: string;
  role: string;
  email: string;
  name: string;

  constructor(license: string, role: string, email: string, name: string) {
    this.license = license;
    this.role = role;
    this.email = email;
    this.name = name;
  }

  toDataBaseModel(): IUser {
    return {
      role: this.role,
      license: this.license,
      upn: this.email,
      name: this.name,
    };
  }
}

export class MutateUserResponse {
  isSuccess: boolean;
}
