export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  history?: UserRent[];
}

export interface UserRent {
  id: string;
  bikeID: number;
  dateFrom: number;
  dateTo?: number;
}
