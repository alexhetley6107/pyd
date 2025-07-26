export type User = {
  id: string;
  nickname: string;
  email: string;
  loginInfo: LoginInfo;
};

export type LoginInfo = {
  token: string;
};
