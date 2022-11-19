import axios from "axios";
import { Bike } from "../../features/bikes-list/models/bike.model";
import BaseAPI from "../base/base.api";

class BikesListAPI extends BaseAPI {
  getBikes() {
    return axios.get<Bike[]>(this.getPath("/bikes"));
  }
}

const bikesListAPI = new BikesListAPI();

export default bikesListAPI;
