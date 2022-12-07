import { Logger } from "@azure/functions";
import { IConfig } from "../../entities";

export abstract class BaseService {
  public readonly _configuration: IConfig;
  public readonly _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
  }
}
