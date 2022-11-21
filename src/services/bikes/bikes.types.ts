import { BikeRent } from "../../features/bikes-list/models/bike.model";

export interface RentBikeDetails {
  userID: number;
  bikes: RentedBike[];
}

export interface RentedBike {
  dateFrom: number;
  dateTo?: number;
  id: number;
}

export interface SetBikeRentedDetails {
  bikeID: number;
  data: BikeRent[];
}
