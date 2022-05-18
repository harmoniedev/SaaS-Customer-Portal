import { IUser } from "../../interfaces";

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
      cp_role: this.role,
      licenseType: this.license,
      upn: this.email,
      name: this.name,
    };
  }
}
