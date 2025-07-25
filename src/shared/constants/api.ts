const API_URL = 'http://localhost:5001/api';

export const API = {
  login: `${API_URL}/auth/login`,
  signup: `${API_URL}/auth/signup`,
  forgotPassword: `${API_URL}/auth/forgot-password`,
  resetPassword: `${API_URL}/auth/reset-password`,

  board: `${API_URL}/board`,
  status: `${API_URL}/status`,
  task: `${API_URL}/task`,
};
