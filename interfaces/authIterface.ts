export interface RegisterUser
{
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginUser
{
  username: string;
  password: string;
}
