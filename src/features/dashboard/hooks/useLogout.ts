import { AxiosError } from "axios";
import { useMutation } from "react-query";
import authAPI from "../../../services/auth/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../../common/models/storage-keys.enum";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import { Alert } from "react-native";

const logout = async () => {
  try {
    const { data } = await authAPI.logout();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useLogout = () => {
  return useMutation(logout, {
    onSuccess: async () => {
      await AsyncStorage.removeItem(StorageKeysEnum.ACCESS_TOKEN);
      await queryClient.setQueryData(QueryKeysEnum.USER, () => null);
    },
    onError: (error: string) => Alert.alert(error || "Failed to log out"),
  });
};
