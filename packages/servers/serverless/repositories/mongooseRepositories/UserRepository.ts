import UserModel from "../../db/mongoDb/schema/userSchema";
import { IUser } from "../../entities/interfaces/IUser";
import { MongooseBaseRepository } from "../base/MongooseBaseRepository";

class UserRepository extends MongooseBaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }
}

export default UserRepository;
