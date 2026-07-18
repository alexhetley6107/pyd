import { User } from './users.model';

export const USER_REPOSITORY = 'user_repository';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
