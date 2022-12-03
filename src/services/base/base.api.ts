import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../common/models/storage-keys.enum";
import { queryClient } from "../../common/query-client/query-client";
import { QueryKeysEnum } from "../../common/models/query-keys.enum";

const BASE_URL = "http://192.168.0.102:4444";

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem(StorageKeysEnum.ACCESS_TOKEN);

  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (e) => {
    const error = JSON.parse(JSON.stringify(e));

    if (error.status === 401) {
      await AsyncStorage.removeItem(StorageKeysEnum.ACCESS_TOKEN);
      await queryClient.setQueryData(QueryKeysEnum.USER, undefined);
    }

    const responseError = {
      ...error,
      message: e.response.data,
    };

    return Promise.reject(responseError);
  }
);
