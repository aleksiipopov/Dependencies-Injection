import type { ApiConfig } from '../types';
import { Logger } from './logger';

export class HTTP {
  static $inject = ['logger', 'config'];

  logger: Logger;
  apiConfig: ApiConfig;

  constructor(logger: Logger, apiConfig: ApiConfig) {
    this.apiConfig = apiConfig;
    this.logger = logger;
  }

  async get(url: string) {
    const response = await fetch(`${this.apiConfig.path}${url}`);

    if (response.ok) {
      const responseData = await response.json();
      this.logger.info(`Status: ${response.status}. Response: ${JSON.stringify(responseData)}`);

      return responseData;
    } else {
      this.logger.error(`Status: ${response.status}. Status Text: ${response.statusText}`);
    }
  }
}
