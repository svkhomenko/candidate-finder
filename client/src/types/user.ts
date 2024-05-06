export type IRole = 'hr' | 'candidate';

export type IUser = {
  id: string;
  email: string;
  fullName: string;
  role: IRole;
  phoneNumber: string;
};

export type IAccessToken = string;
