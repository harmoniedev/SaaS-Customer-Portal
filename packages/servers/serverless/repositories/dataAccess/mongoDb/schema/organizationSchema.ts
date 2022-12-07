import { Schema, model } from "mongoose";
import { IOrganization } from "../../../../entities";
const subscriptions = {
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
};
const organizationSchema = new Schema<IOrganization>({
  tenantId: { type: String, required: true },
  subscriptions: [subscriptions],
});

export const OrganizationModel = model<IOrganization>(
  "Organization",
  organizationSchema
);
