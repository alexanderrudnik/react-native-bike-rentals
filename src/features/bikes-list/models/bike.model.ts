export interface Bike {
  id: number;
  color: string;
  rating: number;
  photo: string;
  location: string;
  model: string;
  rented: BikeRent[];
}

export interface BikeRent {
  accountID: number;
  dateFrom: number;
  dateTo?: number;
}
