import {
  EditSubscriptionRequest,
  ISubscription,
  UpdateSubscriptionAction,
} from "../../../entities";

export interface ISubscriptionService {
  resolveSubscription(token: string): Promise<ISubscription>;
  activateSubscription(
    subscriptionRes: ISubscription,
    access_token: string
  ): Promise<void>;
  subscriptionUnsubscribe(
    editSubscription: EditSubscriptionRequest
  ): Promise<void>;
  getValidSubscriptions(tenantId: string): Promise<ISubscription[]>;
  getAssignedLicenseCount(subscriptionId: string): Promise<number>;
  getValidSubscription(tenantId: string): Promise<ISubscription>;
  updateSubscriptionState(
    action: UpdateSubscriptionAction,
    editSubscription: EditSubscriptionRequest
  ): Promise<void>;
}
