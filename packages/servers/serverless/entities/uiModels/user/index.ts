import { IUser } from "../../interfaces";

export class AddUserView {
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

export class ViewUser {
  lastActiveDate?: string;
  license: string;
  role: string;
  email: string;
  name: string;
  id: string;
  constructor(user: IUser) {
    this.email = user?.upn;
    this.id = user._id;
    this.lastActiveDate = user?.lastUsage?.toISOString();
    this.license = user?.license;
    this.name = user?.name;
    this.role = user?.role;
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
