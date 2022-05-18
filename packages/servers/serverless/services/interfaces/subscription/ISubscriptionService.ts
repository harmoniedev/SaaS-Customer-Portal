import { ISubscription } from "../../../entities";

export interface ISubscriptionService {
  resolveSubscription(token: string): Promise<ISubscription>;
  activateSubscription(): Promise<ISubscription>;
}
