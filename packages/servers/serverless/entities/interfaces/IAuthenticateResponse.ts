export class IAuthenticateResponse {
  token_type: string;
  expires_in: string;
  ext_expires_in: number;
  expires_on: number;
  not_before: number;
  resource: string;
  access_token: string;
}
