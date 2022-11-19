import { axiosInstance } from "../base/base.api";
import { AuthDetails, AuthResponse } from "./auth.types";

class AuthAPI {
  signup(details: AuthDetails) {
    return axiosInstance.post<AuthResponse>("/register", details);
  }

  login(details: AuthDetails) {
    return axiosInstance.post<AuthResponse>("/login", details);
  }
}

const authAPI = new AuthAPI();

export default authAPI;
