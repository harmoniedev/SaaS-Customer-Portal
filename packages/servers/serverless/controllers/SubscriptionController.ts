import { Logger } from "@azure/functions";
import {
  EditSubscriptionRequest,
  IConfig,
  ISubscription,
  UpdateSubscriptionAction,
} from "../entities";
import { ISubscriptionService, SubscriptionService } from "../services";
import { BaseController } from "./base/BaseController";

export class SubscriptionController extends BaseController {
  private _subscriptionService: ISubscriptionService;
  constructor(configuration: IConfig, log: Logger) {
    super(configuration, log);
    this._subscriptionService = new SubscriptionService(
      this._configuration,
      this._logger
    );
  }
  async updateSubscriptionState(
    action: UpdateSubscriptionAction,
    editSubscription: EditSubscriptionRequest
  ) {
    try {
      this._logger.info(
        `[SubscriptionController - updateSubscriptionState] started ${new Date().toISOString()}`
      );
      const results = await this._subscriptionService.updateSubscriptionState(
        action,
        editSubscription
      );
      this._logger.info(
        `[SubscriptionController - updateSubscriptionState] finish ${new Date().toISOString()}`
      );
      return results;
    } catch (error: any) {
      this._logger.error(
        `[SubscriptionController - resolveSubscription] error ${error.message}`
      );
      throw error;
    }
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
  async unsubscribe(
    editSubscriptionRequest: EditSubscriptionRequest
  ): Promise<void> {
    try {
      this._logger.info(
        `[SubscriptionController - unsubscribe] started ${new Date().toISOString()}`
      );
      await this._subscriptionService.subscriptionUnsubscribe(
        editSubscriptionRequest
      );
      this._logger.info(
        `[SubscriptionController - unsubscribe] finish ${new Date().toISOString()}`
      );
    } catch (error: any) {
      this._logger.error(
        `[SubscriptionController - unsubscribe] error ${error.message}`
      );
      throw error;
    }
  }
  async activateSubscription(subscription: ISubscription, appToken: string) {
    try {
      this._logger.info(
        `[SubscriptionController - activateSubscription] started ${new Date().toISOString()}`
      );
      await this._subscriptionService.activateSubscription(
        subscription,
        appToken
      );
      this._logger.info(
        `[SubscriptionController - activateSubscription] finish ${new Date().toISOString()}`
      );
    } catch (error: any) {
      this._logger.error(
        `[SubscriptionController - activateSubscription] error ${error.message}`
      );
      throw error;
    }
  }
}
