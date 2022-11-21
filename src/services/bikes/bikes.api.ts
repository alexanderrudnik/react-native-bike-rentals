import { Bike } from "../../features/bikes-list/models/bike.model";
import { Account } from "../account/account.types";
import { axiosInstance } from "../base/base.api";
import { BikeDetails, SetBikeDetails } from "./bikes.types";

class BikesAPI {
  getBikes() {
    return axiosInstance.get<Bike[]>("/bikes");
  }

  setBikeRented({ bikeID, data }: SetBikeDetails) {
    return axiosInstance.patch<Bike>(`/bikes/${bikeID}`, {
      rented: data,
    });
  }

  rentBike({ userID, bikes }: BikeDetails) {
    return axiosInstance.patch<Account>(`/users/${userID}`, {
      rentedBikes: bikes,
    });
  }

  cancelBikeRent({ userID, bikes }: BikeDetails) {
    return axiosInstance.patch<Account>(`/users/${userID}`, {
      rentedBikes: bikes,
    });
  }

  setBikeCancelled({ bikeID, data }: SetBikeDetails) {
    return axiosInstance.patch<Bike>(`/bikes/${bikeID}`, {
      rented: data,
    });
  }

  rateBike({ userID, bikes }: BikeDetails) {
    return axiosInstance.patch<Account>(`/users/${userID}`, {
      rentedBikes: bikes,
    });
  }
}

const bikesAPI = new BikesAPI();

export default bikesAPI;
