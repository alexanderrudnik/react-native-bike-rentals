import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import bikesAPI from "../../../services/bikes/bikes.api";

const getBikes = async () => {
  try {
    const { data } = await bikesAPI.getBikes();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useBikes = () => {
  return useQuery(QueryKeysEnum.BIKES, getBikes, {
    onError: (error: string) => Alert.alert(error || "Failed to get bikes"),
  });
};
