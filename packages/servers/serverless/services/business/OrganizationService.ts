import { Logger } from "@azure/functions";
import { IConfig, ISubscription, OrgLicensesDetails } from "../../entities";
import { BaseService } from "../base/BaseService";
import { IOrganizationService, ISubscriptionService } from "../interfaces";
import { SubscriptionService } from "./SubscriptionService";

export class OrganizationService
  extends BaseService
  implements IOrganizationService
{
  private readonly _subscriptionService: ISubscriptionService;

  constructor(configuration: IConfig, log: Logger) {
    super(configuration, log);
    this._subscriptionService = new SubscriptionService(
      this._configuration,
      this._logger
    );
  }

  async getOrgLicenses(tenantId: string): Promise<OrgLicensesDetails> {
    this._logger.info(
      `[OrganizationService - getOrgLicenses] started for tenantId ${tenantId}, dateTime ${new Date().toISOString()}`
    );
    let orgLicensesDetails: OrgLicensesDetails;
    try {
      const validSubscription =
        await this._subscriptionService.getValidSubscriptions(tenantId);
      orgLicensesDetails = await this.getAssignedLicenseCount(
        validSubscription
      );
    } catch (error: any) {
      this._logger.info(
        `[OrganizationService - getOrgLicenses] error for tenantId ${tenantId}, error dateTime ${new Date().toISOString()}, error: ${
          error.message
        }`
      );
      throw error;
    }
    this._logger.info(
      `[OrganizationService - getOrgLicenses] finish for tenantId ${tenantId}, dateTime ${new Date().toISOString()}`
    );
    return orgLicensesDetails;
  }

  private async getAssignedLicenseCount(
    subscriptions: ISubscription[]
  ): Promise<OrgLicensesDetails> {
    let licenseCount = 0;
    let assignedLicensesCount = 0;
    for (let index = 0; index < subscriptions?.length; index++) {
      const subscription = subscriptions[index];
      licenseCount += subscription.quantity;
      assignedLicensesCount +=
        await this._subscriptionService.getAssignedLicenseCount(
          subscription.id
        );
    }
    return new OrgLicensesDetails(licenseCount, assignedLicensesCount);
  }
}
