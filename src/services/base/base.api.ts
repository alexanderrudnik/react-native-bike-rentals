import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StorageKeysEnum } from "../../common/models/storage-keys.enum";

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
