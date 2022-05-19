import { Logger } from "@azure/functions";
import {
  IConfig,
  ISubscription,
  IAuthenticateResponse,
  IOrganization,
  IUser,
  Role,
} from "../../entities";
import {
  BaseRepository,
  OrganizationRepositoryFactory,
  UserRepositoryFactory,
} from "../../repositories";
import { HttpProvider, AuthenticationProvider } from "../../utils";
import { ISubscriptionService } from "../interfaces";

export class SubscriptionService implements ISubscriptionService {
  private readonly _userRepository: BaseRepository<IUser>;
  private readonly _userFactory = new UserRepositoryFactory();
  private readonly _organizationFactory = new OrganizationRepositoryFactory();
  private readonly _organizationRepository: BaseRepository<IOrganization>;
  private static _httpService: HttpProvider = new HttpProvider();
  private static _authenticationService: AuthenticationProvider;
  private readonly _config: IConfig;
  private readonly _logger: Logger;

  constructor(config: IConfig, log: Logger) {
    this._config = config;
    this._logger = log;
    this._userRepository = this._userFactory.initRepository(
      this._config.dbType
    );
    this._organizationRepository = this._organizationFactory.initRepository(
      this._config.dbType
    );
    this.initStaticMembers();
  }
  private initStaticMembers() {
    this.initHttpProvider();
    SubscriptionService._authenticationService = new AuthenticationProvider(
      this._config
    );
  }

  private initHttpProvider() {
    if (!SubscriptionService._httpService) {
      SubscriptionService._httpService = new HttpProvider();
    }
  }
  private initAuthProvider() {
    if (!SubscriptionService._authenticationService) {
      SubscriptionService._authenticationService = new AuthenticationProvider(
        this._config
      );
    }
  }

  async resolveSubscription(token: string): Promise<ISubscription> {
    this._logger.info(
      `[resolveSubscription] started ${new Date().toISOString()}`
    );
    let subscriptionRes: ISubscription;
    try {
      const { access_token }: IAuthenticateResponse =
        await SubscriptionService._authenticationService.getAppAuthenticationToken();
      if (access_token) {
        subscriptionRes = await this.getSubscriptionDetails(
          access_token,
          token
        );
        if (subscriptionRes?.subscription) {
          await this.getSubscriptionOwners(subscriptionRes);
          const organization: IOrganization =
            await this.getOrCreateOrganization(subscriptionRes);
          //check if subscription exists if not we will create one, else we will
          //
          if (!this.isSubScriptionAlreadyAdded(organization, subscriptionRes)) {
            await this.addSubscriptionToOrganization(
              organization,
              subscriptionRes
            );
          }
        }
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
    return subscriptionRes;
  }

  private isSubScriptionAlreadyAdded(
    organization: IOrganization,
    subscriptionRes: ISubscription
  ) {
    return organization?.subscriptions?.find(
      (subscription: ISubscription) => subscription.id === subscriptionRes.id
    );
  }

  private async addSubscriptionToOrganization(
    organization: IOrganization,
    subscriptionRes: ISubscription
  ) {
    organization.subscriptions = organization?.subscriptions
      ? [...organization.subscriptions, subscriptionRes]
      : [subscriptionRes];
    const updateOrganization =
      await this._organizationRepository.findOneAndUpdate(
        {
          _id: organization._id,
        },
        organization
      );
    return updateOrganization;
  }

  private async getOrCreateOrganization(
    subscriptionRes: ISubscription
  ): Promise<IOrganization> {
    return await this._organizationRepository.findOneAndUpdate<IOrganization>(
      {
        tenantId: subscriptionRes?.subscription.purchaser.tenantId,
      },
      { tenantId: subscriptionRes?.subscription.purchaser.tenantId }
    );
  }

  private async getSubscriptionOwners(response: ISubscription) {
    //if purchaser is the same as the beneficiary we will return only one user
    const isPurchaserIsBeneficiary =
      response?.subscription.purchaser.objectId ===
      response?.subscription?.beneficiary?.objectId;

    const usersQueries = this.prepareFindOwnerQuery(
      isPurchaserIsBeneficiary,
      response
    );
    return await this.findOwnerOrCreateUser(usersQueries, response);
  }

  private prepareFindOwnerQuery(
    isPurchaserIsBeneficiary: boolean,
    response: ISubscription
  ) {
    return isPurchaserIsBeneficiary
      ? [
          {
            userId: response?.subscription.purchaser.objectId,
            tenantId: response?.subscription.purchaser.tenantId,
            upn: response?.subscription.purchaser.emailId,
          },
        ]
      : [
          {
            userId: response?.subscription.purchaser.objectId,
            tenantId: response?.subscription.purchaser.tenantId,
            upn: response?.subscription.purchaser.emailId,
          },
          {
            tenantId: response?.subscription.beneficiary.tenantId,
            userId: response?.subscription?.beneficiary?.objectId,
            upn: response?.subscription?.beneficiary?.emailId,
          },
        ];
  }

  private async findOwnerOrCreateUser(
    usersQueries: { userId: string; tenantId: string; upn: string }[],
    subscription: ISubscription
  ) {
    const owners: IUser[] = [];
    for (let index = 0; index < usersQueries.length; index++) {
      const userQuery = usersQueries[index];
      const userData: IUser = {
        ...userQuery,
        role: Role.Admin,
        license: subscription.planId,
        subscriptionId: subscription.id,
      };
      const owner: IUser = await this._userRepository.findOneAndUpdate(
        userQuery,
        userData
      );
      if (owner) {
        owners.push(owner);
      }
    }
    return owners;
  }

  private async getSubscriptionDetails(access_token: string, token: string) {
    this._logger.info(
      `[getSubscriptionDetails] started dateTime:${new Date().toISOString()}`
    );
    let subscription: ISubscription;
    const resolveUrl =
      this._config.resolveSubscriptionEndPoint +
      this._config.fulfillmentApiVersion;
    try {
      subscription = await SubscriptionService._httpService.post<ISubscription>(
        resolveUrl,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "x-ms-marketplace-token": token,
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
