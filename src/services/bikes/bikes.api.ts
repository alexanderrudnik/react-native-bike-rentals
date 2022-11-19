import { Bike } from "../../features/bikes-list/models/bike.model";
import { axiosInstance } from "../base/base.api";

class BikesAPI {
  getBikes() {
    return axiosInstance.get<Bike[]>("/bikes");
  }
}

const bikesAPI = new BikesAPI();

export default bikesAPI;
