import { Bike } from "../../features/bikes-list/models/bike.model";
import { axiosInstance } from "../base/base.api";
import { RentBikeDetails } from "./bikes.types";

class BikesAPI {
  getBikes() {
    return axiosInstance.get<Bike[]>("/bikes");
  }

  rentBike({ userID, bikes }: RentBikeDetails) {
    return axiosInstance.patch(`/users/${userID}`, {
      rentedBikes: bikes,
    });
  }
}

const bikesAPI = new BikesAPI();

export default bikesAPI;
