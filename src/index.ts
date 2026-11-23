import { createIoCContainer } from './ioc';
import type { Users } from './services/users';
import type { ApiConfig, User } from './types';

declare global {
  interface Window {
    __CONFIG__?: { api: ApiConfig };
  }
}

const renderUsers = async (users: User[]) => {
  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const clientConfig = window.__CONFIG__;
  delete window.__CONFIG__;

  if (!clientConfig) {
    throw new Error('Client configuration is missing.');
  }

  const ioc = createIoCContainer(clientConfig.api);
  const logger = ioc.resolve('logger');
  const usersService: Users = ioc.resolve('users');

  logger.info('Page is loaded.');
  usersService.getUsers().then(renderUsers);
};

window.onload = app;
