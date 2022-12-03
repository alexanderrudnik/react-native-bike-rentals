import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import userAPI from "../../../services/user/user.api";

const getAllUsers = async () => {
  try {
    const { data } = await userAPI.getAllAcounts();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useAllUsers = () => {
  return useQuery(QueryKeysEnum.USERS, getAllUsers, {
    onError: (error: string) => Alert.alert(error || "Failed to get all users"),
  });
};
