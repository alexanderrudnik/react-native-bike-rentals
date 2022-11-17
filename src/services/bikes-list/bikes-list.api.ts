import axios from "axios";
import BaseAPI from "services/base/base.api";

export default class BikesListAPI extends BaseAPI {
  getBikes() {
    return axios.get(this.getPath("/bikes"));
  }
}
