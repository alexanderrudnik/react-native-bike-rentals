export interface RentBikeDetails {
  userID: number;
  bikes: RentedBike[];
}

export interface RentedBike {
  date: number;
  id: number;
}
