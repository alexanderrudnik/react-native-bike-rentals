import { RentedBike } from "../bikes/bikes.types";

export interface Account {
  id: number;
  email: string;
  password: string;
  role: string;
  rentedBikes?: RentedBike[];
}
