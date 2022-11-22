import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { queryClient } from "../../../common/query-client/query-client";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import accountAPI from "../../../services/account/account.api";
import bikesAPI from "../../../services/bikes/bikes.api";

const rateBike = async ({
  rating,
  dateFrom,
}: {
  rating: number;
  dateFrom: number;
}) => {
  try {
    const { data: account } = await accountAPI.getMe();

    if (account.rentedBikes) {
      const newRentedBikes = account.rentedBikes?.map((bike) =>
        bike.dateFrom === dateFrom ? { ...bike, rated: rating } : bike
      );

      const response = await bikesAPI.rateBike({
        userID: account.id,
        bikes: newRentedBikes,
      });

      return response.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useRateBike = () => {
  return useMutation(rateBike, {
    onSuccess: async (data) => {
      await queryClient.setQueryData(QueryKeysEnum.ACCOUNT, () => data);
    },
    onError: (error: string) => Alert.alert("Error", error),
  });
};
