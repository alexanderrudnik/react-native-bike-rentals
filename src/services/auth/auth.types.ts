export interface AuthDetails {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    id: string;
  };
}
