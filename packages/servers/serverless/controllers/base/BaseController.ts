import { Logger } from "@azure/functions";
import { IConfig } from "../../entities";

export abstract class BaseController {
  public readonly _configuration: IConfig;
  public _logger: Logger;
  constructor(configuration: IConfig, log: Logger) {
    this._logger = log;
    this._configuration = configuration;
  }
}
