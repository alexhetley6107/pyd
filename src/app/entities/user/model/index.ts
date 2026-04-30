import { Nullable } from '@/shared/types';

export type User = {
  nickname: string;
  email: string;
  photo: Nullable<string>;
};
