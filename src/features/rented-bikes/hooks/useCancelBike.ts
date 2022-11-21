import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { queryClient } from "../../../../App";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import accountAPI from "../../../services/account/account.api";
import bikesAPI from "../../../services/bikes/bikes.api";
import { dateService } from "../../../services/date/date.service";
import { Bike } from "../../bikes-list/models/bike.model";

const cancelBike = async ({
  bike,
  dateFrom,
}: {
  bike: Bike;
  dateFrom: number;
}) => {
  try {
    const { data: account } = await accountAPI.getMe();

    const now = dateService.getNow();

    if (account?.rentedBikes) {
      const newRentedBikes = account.rentedBikes.map((rentedBike) =>
        rentedBike.id === bike.id ? { ...rentedBike, dateTo: now } : rentedBike
      );

      const { data: newAccount } = await bikesAPI.cancelBikeRent({
        userID: account.id,
        bikes: newRentedBikes,
      });

      const newRented = bike.rented.map((rent) =>
        rent.accountID === account.id && rent.dateFrom === dateFrom
          ? { ...rent, dateTo: now }
          : rent
      );

      const { data: newBike } = await bikesAPI.setBikeCancelled({
        bikeID: bike.id,
        data: newRented,
      });

      return {
        newAccount,
        newBike,
      };
    }
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useCancelBike = () => {
  return useMutation(cancelBike, {
    onSuccess: async (data) => {
      if (data?.newAccount && data.newBike) {
        await queryClient.setQueryData(
          QueryKeysEnum.ACCOUNT,
          () => data.newAccount
        );

        queryClient.setQueryData(QueryKeysEnum.BIKES, (old: Bike[]) => {
          return old.map((bike) =>
            bike.id === data.newBike.id ? data.newBike : bike
          );
        });
      }
    },
    onError: (error: string) => Alert.alert("Error", error),
  });
};
