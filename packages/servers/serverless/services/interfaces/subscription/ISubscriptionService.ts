import { ActivateSubscription, ISubscription } from "../../../entities";

export interface ISubscriptionService {
  resolveSubscription(token: string): Promise<ISubscription>;
  activateSubscription(
    subscriptionRes: ISubscription,
    access_token: string
  ): Promise<void>;
  removeSubscription(subscription: ISubscription): Promise<void>;
  getValidSubscriptions(tenantId: string): Promise<ISubscription[]>;
  getAssignedLicenseCount(subscriptionId: string): Promise<number>;
  getValidSubscription(tenantId: string): Promise<ISubscription>;
}
