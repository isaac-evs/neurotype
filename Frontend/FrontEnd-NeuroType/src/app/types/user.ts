export interface User {
  email: string;
  password: string;
}

export interface UserLogin{
  username: string,
  password: string
}

export interface AuthResponse {
  access_token: string;
}
