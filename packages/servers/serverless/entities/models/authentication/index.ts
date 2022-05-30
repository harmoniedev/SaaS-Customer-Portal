export class OpenIdConfig {
  token_endpoint: string;
  token_endpoint_auth_methods_supported: string[];
  jwks_uri: string;
  response_modes_supported: string[];
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
  response_types_supported: string[];
  scopes_supported: string[];
  issuer: string;
  microsoft_multi_refresh_token: boolean;
  authorization_endpoint: string;
  device_authorization_endpoint: string;
  http_logout_supported: boolean;
  frontchannel_logout_supported: boolean;
  end_session_endpoint: string;
  claims_supported: string[];
  check_session_iframe: string;
  userinfo_endpoint: string;
  kerberos_endpoint: string;
  tenant_region_scope: any;
  cloud_instance_name: string;
  cloud_graph_host_name: string;
  msgraph_host: string;
  rbac_url: string;
}

export class Token {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  name: string;
  nbf: number;
  nonce: string;
  oid: string;
  preferred_username: string;
  rh: string;
  sub: string;
  tid: string;
  uti: string;
  ver: string;
}
export class TokenHeader {
  alg: string;
  kid: string;
  typ: string;
}
export class OpenIdKey {
  kty: string;
  use: string;
  kid: string;
  x5t: string;
  n: string;
  e: string;
  x5c: string[];
}
export class OpenIdKeys {
  keys: OpenIdKey[];
}
export class AuthenticationResult {
  isAuthenticate: boolean;
  status: number;
  message: string;
}
