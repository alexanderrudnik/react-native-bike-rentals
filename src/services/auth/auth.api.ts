import axios from "axios";
import BaseAPI from "../base/base.api";
import { SignupDetails, SignupResponse } from "./auth.types";

class AuthAPI extends BaseAPI {
  signup(details: SignupDetails) {
    return axios.post<SignupResponse>(this.getPath("/register"), details);
  }
}

const authAPI = new AuthAPI();

export default authAPI;
