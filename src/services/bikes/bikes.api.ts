import { axiosInstance } from "../base/base.api";
import {
  Bike,
  CancelBikeRentDetails,
  CancelBikeRentResponse,
  RateBikeDetails,
  RateBikeResponse,
  RentBikeDetails,
  RentBikeResponse,
} from "./bikes.types";

class BikesAPI {
  getBikes() {
    return axiosInstance.get<Bike[]>("/bikes");
  }

  rentBike(details: RentBikeDetails) {
    return axiosInstance.post<RentBikeResponse>("/rent", details);
  }

  cancelBikeRent(details: CancelBikeRentDetails) {
    return axiosInstance.post<CancelBikeRentResponse>("/cancel", details);
  }

  rateBike(details: RateBikeDetails) {
    return axiosInstance.post<RateBikeResponse>("rate", details);
  }
}

const bikesAPI = new BikesAPI();

export default bikesAPI;
