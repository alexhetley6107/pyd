export type User = {
  id: number;
  userName: string;
  email: string;
  loginInfo: {
    token: string;
  };
};
