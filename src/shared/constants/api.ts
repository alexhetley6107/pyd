import { ENV } from '@/environments/environment';

const URL = ENV.API_URL;

export const API = {
  login: `${URL}/auth/login`,
  signup: `${URL}/auth/signup`,
  forgotPassword: `${URL}/auth/forgot-password`,
  resetPassword: `${URL}/auth/reset-password`,

  board: `${URL}/board`,
  status: `${URL}/status`,
  task: `${URL}/task`,
};
