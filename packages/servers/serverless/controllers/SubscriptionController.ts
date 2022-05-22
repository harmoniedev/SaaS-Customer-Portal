import { Logger } from "@azure/functions";
import { IConfig, ISubscription } from "../entities";
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
  async resolveSubscription(token: string): Promise<ISubscription> {
    try {
      this._logger.info(
        `[SubscriptionController - resolveSubscription] started ${new Date().toISOString()}`
      );
      const resolveResults =
        await this._subscriptionService.resolveSubscription(token);
      this._logger.info(
        `[SubscriptionController - resolveSubscription] finish ${new Date().toISOString()}`
      );
      return resolveResults;
    } catch (error: any) {
      this._logger.error(
        `[SubscriptionController - resolveSubscription] error ${error.message}`
      );
      throw error;
    }
  }
  async unsubscribe(subscription: ISubscription): Promise<void> {
    try {
      this._logger.info(
        `[SubscriptionController - unsubscribe] started ${new Date().toISOString()}`
      );
      await this._subscriptionService.removeSubscription(subscription);
      this._logger.info(
        `[SubscriptionController - unsubscribe] finish ${new Date().toISOString()}`
      );
    } catch (error: any) {
      this._logger.error(
        `[SubscriptionController - unsubscribe] error ${error.message}`
      );
    }
  }
}
