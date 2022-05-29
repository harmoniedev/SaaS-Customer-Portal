import { ISubscription } from "../../interfaces";

export class ActivateSubscription {
  planId: string;
  quantity: number;
}

export class AddSubscription {
  id: string; // purchased SaaS subscription ID
  subscriptionName: string; // SaaS subscription name
  offerId: string; // purchased offer ID
  planId: string; // purchased offer's plan ID
  quantity: number; // number of purchased seats, might be empty if the plan is not per seat
  subscription: ISubscription;
}
export class EditSubscriptionRequest {
  id: string;
  activityId: string;
  publisherId: string;
  offerId: string;
  planId: string;
  quantity: 1;
  subscriptionId: string;
  timeStamp: string;
  action: string;
  status: string;
  operationRequestSource: string;
  subscription: ISubscription;
}
