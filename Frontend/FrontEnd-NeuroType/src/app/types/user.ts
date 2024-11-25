export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}
