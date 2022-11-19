export interface SignupDetails {
  email: string;
  password: string;
}

export interface SignupResponse {
  accessToken: string;
  user: {
    email: string;
    id: string;
  };
}
