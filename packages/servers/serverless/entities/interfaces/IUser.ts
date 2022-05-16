export interface IUser {
  tenantId: string;
  userId: string;
  teamsUserId: string;
  redirectUri: string;
  upn: string;
  domain: string;
  refreshToken: string;
  token: string;
  tokenExpiration: Date;
  digestSendTime: Date;
  emailsShared: number;
  walkthroughCompleted: boolean;
  geography: string;
  firstUsage: Date;
  lastUsage: Date;
  name: string;
  emailSignature: string;
  isNotifyOnCreateTask: boolean;
  settings: string[];
  //owner and?
  cp_role: string;
  //planId from subscription
  licenseType: string;
}
