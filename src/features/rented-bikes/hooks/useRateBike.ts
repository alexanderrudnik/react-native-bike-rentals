import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import bikesAPI from "../../../services/bikes/bikes.api";
import { Bike, RateBikeDetails } from "../../../services/bikes/bikes.types";

const rateBike = async (details: RateBikeDetails) => {
  try {
    const { data } = await bikesAPI.rateBike(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useRateBike = () => {
  return useMutation(rateBike, {
    onSuccess: async (data) => {
      await queryClient.setQueryData(QueryKeysEnum.BIKES, (bikes: any) => {
        return bikes.map((bike: Bike) => (bike.id === data.id ? data : bike));
      });
    },
    onError: (error: string) => Alert.alert(error || "Failed to rate the bike"),
  });
};
