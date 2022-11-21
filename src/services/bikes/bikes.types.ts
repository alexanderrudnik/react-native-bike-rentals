import { BikeRent } from "../../features/bikes-list/models/bike.model";

export interface BikeDetails {
  userID: number;
  bikes: RentedBike[];
}

export interface RentedBike {
  dateFrom: number;
  dateTo?: number;
  id: number;
}

export interface SetBikeDetails {
  bikeID: number;
  data: BikeRent[];
}
