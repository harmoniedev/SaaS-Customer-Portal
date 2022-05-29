export enum DbTypes {
  mongoose,
  mongo,
  sql,
}
export enum Role {
  Admin = "Admin",
  Member = "Member",
}
export enum SaasSubscriptionStatus {
  PendingFulfillmentStart = "PendingFulfillmentStart",
  Subscribed = "Subscribed",
  Suspended = "Suspended",
  Unsubscribed = "Unsubscribed",
}
export enum SortDirection {
  ASC = -1,
  DESC = 1,
}
export enum UpdateSubscriptionAction {
  ChangePlan = "ChangePlan",
  ChangeQuantity = "ChangeQuantity",
  Renew = "Renew",
  Suspend = "Suspend",
  Unsubscribe = "Unsubscribe",
  Reinstate = "Reinstate",
}
