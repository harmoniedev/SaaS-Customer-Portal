import { Schema, model } from "mongoose";
import { IOrganization } from "../../../entities";
const subscription = {
  id: String,
  subscriptionName: String,
  offerId: String,
  planId: String,
  quantity: Number,
  subscription: {
    id: String,
    publisherId: String,
    offerId: String,
    name: String,
    saasSubscriptionStatus: String,
    beneficiary: {
      emailId: String,
      objectId: String,
      tenantId: String,
      pid: String,
    },
    purchaser: {
      emailId: String,
      objectId: String,
      tenantId: String,
      pid: String,
    },
    planId: String,
    term: {
      termUnit: String,
      startDate: Date,
      endDate: Date,
    },
    autoRenew: Boolean,
    isTest: Boolean,
    isFreeTrial: Boolean,
    allowedCustomerOperations: [String],
    sandboxType: String,
    lastModified: Date,
    quantity: Number,
    sessionMode: String,
  },
};
const organizationSchema = new Schema<IOrganization>({
  tenantId: { type: String, required: true },
  licenseCount: { type: Number, required: false, default: 0 },
  assignedLicensesCount: { type: Number, required: false, default: 0 },
  subscription: [subscription],
});

export const OrganizationModel = model<IOrganization>(
  "Organization",
  organizationSchema
);
