import { Logger } from "@azure/functions";
import {
  IConfig,
  IOrganization,
  ISubscription,
  IUser,
  OrgLicensesDetails,
  SaasSubscriptionStatus,
} from "../../entities";
import {
  OrganizationRepositoryFactory,
  BaseRepository,
  UserRepositoryFactory,
} from "../../repositories";
import { IOrganizationService } from "../interfaces";

export class OrganizationService implements IOrganizationService {
  private readonly _organizationFactory = new OrganizationRepositoryFactory();
  private readonly _organizationRepository: BaseRepository<IOrganization>;
  private readonly _userRepository: BaseRepository<IUser>;
  private readonly _userFactory = new UserRepositoryFactory();
  private readonly _configuration: IConfig;
  private readonly _logger: Logger;

  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
    this._organizationRepository = this._organizationFactory.initRepository(
      this._configuration.dbType
    );
    this._userRepository = this._userFactory.initRepository(
      this._configuration.dbType
    );
  }

  async getOrgLicenses(tenantId: string): Promise<OrgLicensesDetails> {
    this._logger.info(
      `[OrganizationService - getOrgLicenses] started for tenantId ${tenantId}, dateTime ${new Date().toISOString()}`
    );
    let organization: IOrganization;
    try {
      organization = await this._organizationRepository.findOne<IOrganization>({
        tenantId,
      });
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
    const validSubscription =
      organization?.subscriptions?.filter(
        (subscription: ISubscription) =>
          subscription.saasSubscriptionStatus ===
          SaasSubscriptionStatus.Subscribed
      ) || [];
    const orgLicensesDetails: OrgLicensesDetails =
      await this.getAssignedLicenseCount(validSubscription);
    return orgLicensesDetails;
  }

  private async getAssignedLicenseCount(
    subscriptions: ISubscription[]
  ): Promise<OrgLicensesDetails> {
    let licenseCount = 0;
    let assignedLicensesCount = 0;
    for (let index = 0; index < subscriptions.length; index++) {
      const subscription = subscriptions[index];
      licenseCount += subscription.quantity;
      assignedLicensesCount += await this.getUsersCountBySubscriptionId(
        subscription.id
      );
    }
    return new OrgLicensesDetails(licenseCount, assignedLicensesCount);
  }

  async getUsersCountBySubscriptionId(subscriptionId: string): Promise<number> {
    const response: IUser[] = await this._userRepository.find<IUser>({
      subscriptionId: subscriptionId,
    });
    return response.length;
  }
}
