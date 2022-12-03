import { axiosInstance } from "../base/base.api";
import { User } from "./user.types";

class UserAPI {
  getMe() {
    return axiosInstance.get<User>("/me");
  }

  getAllAcounts() {
    return axiosInstance.get<User[]>("/users");
  }

  deleteUser(id: number) {
    return axiosInstance.delete(`/users/${id}`);
  }
}

const userAPI = new UserAPI();

export default userAPI;
