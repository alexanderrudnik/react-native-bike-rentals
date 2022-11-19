import { AxiosError } from "axios";
import { useQuery } from "react-query";
import accountAPI from "../../services/account/account.api";
import { QueryKeysEnum } from "../models/query-keys.enum";

const fetchAccount = async () => {
  try {
    const response = await accountAPI.getMe();

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useAccount = () => {
  return useQuery(QueryKeysEnum.ACCOUNT, fetchAccount);
};
