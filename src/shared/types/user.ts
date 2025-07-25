export type User = {
  id: string;
  userName: string;
  email: string;
  loginInfo: LoginInfo;
};

export type LoginInfo = {
  token: string;
};
