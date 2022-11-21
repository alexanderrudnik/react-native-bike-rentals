import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import accountAPI from "../../../services/account/account.api";

const fetchAccounts = async () => {
  try {
    const response = await accountAPI.getAllAcounts();

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useAccounts = () => {
  return useQuery(QueryKeysEnum.ACCOUNTS, fetchAccounts, {
    onError: (error: string) => Alert.alert("Error", error),
  });
};
