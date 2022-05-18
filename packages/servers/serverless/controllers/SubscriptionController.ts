import { Logger } from "@azure/functions";
import { IConfig } from "../entities";
import { ISubscriptionService, SubscriptionService } from "../services";

export class SubscriptionController {
  private _subscriptionService: ISubscriptionService;
  private _configuration: IConfig;
  private _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._subscriptionService = new SubscriptionService(
      this._configuration,
      this._logger
    );
  }
  async resolveSubscription(token: string) {
    return await this._subscriptionService.resolveSubscription(token);
  }
}
