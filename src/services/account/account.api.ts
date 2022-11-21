import { axiosInstance } from "../base/base.api";
import { Account } from "./account.types";

class AccountAPI {
  getMe() {
    return axiosInstance.get<Account>("/me");
  }

  getAllAcounts() {
    return axiosInstance.get<Account[]>("/users");
  }

  deleteUser(id: number) {
    return axiosInstance.delete(`/users/${id}`);
  }
}

const accountAPI = new AccountAPI();

export default accountAPI;
