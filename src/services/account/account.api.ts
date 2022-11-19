import { axiosInstance } from "../base/base.api";
import { Account } from "./account.types";

class AccountAPI {
  getMe() {
    return axiosInstance.get<Account>("/me");
  }
}

const accountAPI = new AccountAPI();

export default accountAPI;
