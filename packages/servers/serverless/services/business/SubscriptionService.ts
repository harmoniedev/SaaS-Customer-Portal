import { IConfig, ISubscription, IAuthenticateResponse } from "../../entities";
import { HttpProvider } from "../../utils";
import { AuthenticationProvider } from "../../utils";
import { ISubscriptionService } from "../interfaces";

export class SubscriptionService implements ISubscriptionService {
  private static readonly _httpService: HttpProvider = new HttpProvider();
  private static _authenticationService: AuthenticationProvider;
  private readonly _config: IConfig;
  constructor(config: IConfig) {
    this._config = config;
    if (!SubscriptionService._authenticationService) {
      SubscriptionService._authenticationService = new AuthenticationProvider(
        this._config
      );
    }
  }
  async resolveSubscription(token: string): Promise<ISubscription> {
    if (this._config.authenticationUrl) {
      const { access_token }: IAuthenticateResponse =
        await SubscriptionService._authenticationService.getAppAuthenticationToken();
      const response = await SubscriptionService._httpService.post(
        this._config.resolveSubscriptionEndPoint,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${access_token}`,
            "x-ms-marketplace-token": decodeURI(token),
          },
        }
      );
    }

    return;
  }

  async activateSubscription(): Promise<ISubscription> {
    throw new Error("Method not implemented.");
  }
}
