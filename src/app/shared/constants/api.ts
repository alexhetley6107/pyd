import { ENV } from '@/app/environments/environment';

const URL = ENV.API_URL;

export const API = {
  login: `${URL}/auth/login`,
  signup: `${URL}/auth/signup`,
  forgotPassword: `${URL}/auth/forgot-password`,
  resetPassword: `${URL}/auth/reset-password`,
  me: `${URL}/auth/me`,
  refresh: `${URL}/auth/refresh`,
  logout: `${URL}/auth/logout`,

  board: `${URL}/board`,
  status: `${URL}/status`,
  task: `${URL}/task`,

  upload: `${URL}/user/upload-photo`,
};
