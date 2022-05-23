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
