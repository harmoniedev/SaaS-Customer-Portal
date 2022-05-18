import { IConfig } from "../entities";
import { ISubscriptionService, SubscriptionService } from "../services";

export class SubscriptionController {
  private _subscriptionService: ISubscriptionService;
  private _configuration: IConfig;
  constructor(configuration: IConfig) {
    this._configuration = configuration;
    this._subscriptionService = new SubscriptionService(this._configuration);
  }
  async resolveSubscription(token: string) {
    this._subscriptionService.resolveSubscription(token);
  }
}
