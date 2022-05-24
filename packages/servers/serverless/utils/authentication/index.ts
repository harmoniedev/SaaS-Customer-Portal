import { Logger } from "@azure/functions";
import { IAuthenticateResponse, IConfig } from "../../entities";
import { HttpProvider } from "../httpProvider";

export class AuthenticationProvider {
  private static readonly _httpService: HttpProvider = new HttpProvider();
  private readonly _config: IConfig;
  constructor(config: IConfig) {
    this._config = config;
  }
  async acquireAppAuthenticationToken(): Promise<IAuthenticateResponse> {
    let authResponse: IAuthenticateResponse;
    try {
      authResponse =
        await AuthenticationProvider._httpService.post<IAuthenticateResponse>(
          this._config.authenticationUrl.replace(
            "*{tenantId}*",
            this._config.tenantId
          ),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "client_credentials",
              client_id: this._config.appClientId,
              client_secret: this._config.appClientSecret,
              resource: "20e940b3-4c77-4b0b-9a53-9e16a1b010a7",
            }).toString(),
          }
        );
    } catch (error: any) {
      throw error;
    }
    return authResponse;
  }
}
