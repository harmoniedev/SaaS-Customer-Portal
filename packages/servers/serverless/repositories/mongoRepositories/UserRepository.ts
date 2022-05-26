import { UserModel } from "../dataAccess/mongoDb/schema";
import { IUser } from "../../entities/interfaces";
import { MongooseRepository } from "./base";

class UserRepository extends MongooseRepository<IUser> {
  constructor() {
    super(UserModel);
  }
}

export default UserRepository;
