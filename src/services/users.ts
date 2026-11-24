import type { ApiConfig, User } from '../types';
import { HTTP } from './http';

export class Users {
  static $inject = ['http', 'config'];

  http: HTTP;
  apiConfig: ApiConfig;

  constructor(http: HTTP, apiConfig: ApiConfig) {
    this.http = http;
    this.apiConfig = apiConfig;
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.apiConfig.resources.users) as Promise<User[]>;
  }
}
