import axios from "axios";
import BaseAPI from "services/base/base.api";

class BikesListAPI extends BaseAPI {
  getBikes() {
    return axios.get(this.getPath("/bikes"));
  }
}

const bikesListAPI = new BikesListAPI();

export default bikesListAPI;
