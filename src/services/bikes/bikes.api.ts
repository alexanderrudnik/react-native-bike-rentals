import { Bike } from "../../features/bikes-list/models/bike.model";
import { Account } from "../account/account.types";
import { axiosInstance } from "../base/base.api";
import { RentBikeDetails, SetBikeRentedDetails } from "./bikes.types";

class BikesAPI {
  getBikes() {
    return axiosInstance.get<Bike[]>("/bikes");
  }

  setBikeRented({ bikeID, data }: SetBikeRentedDetails) {
    return axiosInstance.patch<Bike>(`/bikes/${bikeID}`, {
      rented: data,
    });
  }

  rentBike({ userID, bikes }: RentBikeDetails) {
    return axiosInstance.patch<Account>(`/users/${userID}`, {
      rentedBikes: bikes,
    });
  }
}

const bikesAPI = new BikesAPI();

export default bikesAPI;
