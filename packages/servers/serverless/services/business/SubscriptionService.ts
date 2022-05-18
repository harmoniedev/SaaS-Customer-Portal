import { Logger } from "@azure/functions";
import { IConfig, ISubscription, IAuthenticateResponse } from "../../entities";
import { HttpProvider } from "../../utils";
import { AuthenticationProvider } from "../../utils";
import { ISubscriptionService } from "../interfaces";

export class SubscriptionService implements ISubscriptionService {
  private static readonly _httpService: HttpProvider = new HttpProvider();
  private static _authenticationService: AuthenticationProvider;
  private readonly _config: IConfig;
  private readonly _logger: Logger;
  constructor(config: IConfig, log: Logger) {
    this._config = config;
    this._logger = log;
    if (!SubscriptionService._authenticationService) {
      SubscriptionService._authenticationService = new AuthenticationProvider(
        this._config,
        this._logger
      );
    }
  }
  async resolveSubscription(token: string): Promise<ISubscription> {
    this._logger.info(
      `[resolveSubscription] started ${new Date().toISOString()}`
    );
    let response: ISubscription;
    try {
      const { access_token }: IAuthenticateResponse =
        await SubscriptionService._authenticationService.getAppAuthenticationToken();
      if (access_token) {
        response = await this.getSubscriptionDetails(access_token, token);
      }
    } catch (error: any) {
      this._logger.error(
        `[resolveSubscription] error: ${
          error.message
        } ${new Date().toISOString()}`
      );
      throw error;
    }
    this._logger.info(
      `[resolveSubscription] finished ${new Date().toISOString()}`
    );
    return response;
  }

  private async getSubscriptionDetails(access_token: string, token: string) {
    this._logger.info(
      `[getSubscriptionDetails] started dateTime:${new Date().toISOString()}`
    );
    let subscription: ISubscription;
    try {
      subscription = await SubscriptionService._httpService.post<ISubscription>(
        this._config.resolveSubscriptionEndPoint,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${access_token}`,
            "x-ms-marketplace-token": decodeURI(token),
          },
        }
      );
    } catch (error: any) {
      this._logger.error(
        `[getSubscriptionDetails] error ${
          error.message
        } dateTime: ${new Date().toISOString()}`
      );
      throw error;
    }
    this._logger.info(
      `[getSubscriptionDetails] finished dateTime:${new Date().toISOString()}`
    );
    return subscription;
  }

  async activateSubscription(): Promise<ISubscription> {
    throw new Error("Method not implemented.");
  }
}
