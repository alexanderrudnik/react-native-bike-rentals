import { AxiosError } from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "react-query";
import authAPI from "../../../services/auth/auth.api";
import { AuthDetails } from "../../../services/auth/auth.types";
import { StorageKeysEnum } from "../../../common/models/storage-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";

const login = async (details: AuthDetails) => {
  try {
    const response = await authAPI.login(details);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem(
        StorageKeysEnum.ACCESS_TOKEN,
        data.accessToken
      );

      await queryClient.setQueryData(QueryKeysEnum.ACCOUNT, data.user);
    },
    onError: (error: string) => Alert.alert("Error", error),
  });
};
