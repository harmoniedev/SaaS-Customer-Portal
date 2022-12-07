import { OrganizationModel } from "../dataAccess/mongoDb/schema";
import { IOrganization } from "../../entities/interfaces";
import { MongooseRepository } from "./base";

export class OrganizationRepository extends MongooseRepository<IOrganization> {
  constructor() {
    super(OrganizationModel);
  }
}
