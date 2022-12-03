import { AxiosError } from "axios";
import { useMutation } from "react-query";
import authAPI from "../../../services/auth/auth.api";
import { AuthDetails } from "../../../services/auth/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../../common/models/storage-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { Alert } from "react-native";

const login = async (details: AuthDetails) => {
  try {
    const { data } = await authAPI.login(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem(
        StorageKeysEnum.ACCESS_TOKEN,
        data.accessToken
      );

      await queryClient.setQueryData(QueryKeysEnum.USER, data.user);
    },
    onError: (error: string) => Alert.alert(error || "Failed to log in"),
  });
};
