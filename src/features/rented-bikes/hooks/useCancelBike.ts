import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import bikesAPI from "../../../services/bikes/bikes.api";
import {
  Bike,
  CancelBikeRentDetails,
} from "../../../services/bikes/bikes.types";
import { UserRent } from "../../../services/user/user.types";

const cancelBike = async (details: CancelBikeRentDetails) => {
  try {
    const { data } = await bikesAPI.cancelBikeRent(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useCancelBike = () => {
  return useMutation(cancelBike, {
    onSuccess: async (data) => {
      await queryClient.setQueryData(QueryKeysEnum.USER, (user: any) => {
        return {
          ...user,
          history: user.history?.map((rentedBike: UserRent) =>
            rentedBike.id === data.id ? data : rentedBike
          ),
        };
      });

      await queryClient.setQueryData(QueryKeysEnum.BIKES, (bikes: any) => {
        return bikes.map((bike: Bike) => ({
          ...bike,
          history: bike.history?.map((historyItem) =>
            historyItem.id === data.id
              ? { ...historyItem, dateTo: data.dateTo }
              : historyItem
          ),
        }));
      });
    },
    onError: (error: string) =>
      Alert.alert(error || "Failed to cancel the ride"),
  });
};
