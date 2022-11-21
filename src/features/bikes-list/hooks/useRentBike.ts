import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { queryClient } from "../../../../App";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import accountAPI from "../../../services/account/account.api";
import bikesAPI from "../../../services/bikes/bikes.api";
import { RentedBike } from "../../../services/bikes/bikes.types";
import { Bike, BikeRent } from "../models/bike.model";

const rentBike = async ({
  bike,
  duration,
}: {
  bike: Bike;
  duration: number | string;
}) => {
  try {
    const { data: account } = await accountAPI.getMe();

    let newBikes: RentedBike[] = [];

    const dateFrom = Date.now();

    const newAccountBike: RentedBike = {
      id: bike.id,
      dateFrom: dateFrom,
    };

    if (typeof duration === "number") {
      newAccountBike.dateTo = dateFrom + duration;
    }

    newBikes = account?.rentedBikes?.length
      ? [...account.rentedBikes, newAccountBike]
      : [newAccountBike];

    const { data: newAccount } = await bikesAPI.rentBike({
      userID: account.id,
      bikes: newBikes,
    });

    const bikeRent: BikeRent = {
      accountID: account.id,
      dateFrom,
    };

    if (typeof duration === "number") {
      bikeRent.dateTo = dateFrom + duration;
    }

    const newBikeRent = bike.rented?.length
      ? [...bike.rented, bikeRent]
      : [bikeRent];

    const { data: newBike } = await bikesAPI.setBikeRented({
      bikeID: bike.id,
      data: newBikeRent,
    });

    return {
      newAccount,
      newBike,
    };
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useRentBike = () => {
  return useMutation(rentBike, {
    onSuccess: ({ newAccount, newBike }) => {
      queryClient.setQueryData(QueryKeysEnum.ACCOUNT, () => {
        return newAccount;
      });

      queryClient.setQueryData(QueryKeysEnum.BIKES, (old: Bike[]) => {
        return old.map((bike) => (bike.id === newBike.id ? newBike : bike));
      });
    },
    onError: (error: string) => Alert.alert("Error", error),
  });
};
