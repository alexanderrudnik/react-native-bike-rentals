import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { queryClient } from "../../../../App";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import accountAPI from "../../../services/account/account.api";
import { Account } from "../../../services/account/account.types";
import bikesAPI from "../../../services/bikes/bikes.api";
import { RentedBike } from "../../../services/bikes/bikes.types";

const rentBike = async (id: number) => {
  try {
    const { data: account } = await accountAPI.getMe();

    let newBikes: RentedBike[] = [];

    const newBike = {
      id,
      date: Date.now(),
    };

    if (account?.rentedBikes?.length) {
      newBikes = [...account.rentedBikes, newBike];
    } else {
      newBikes = [newBike];
    }

    const response = await bikesAPI.rentBike({
      userID: account.id,
      bikes: newBikes,
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useRentBike = () => {
  return useMutation(rentBike, {
    onSuccess: (_, id) => {
      queryClient.setQueryData(QueryKeysEnum.ACCOUNT, (old: Account) => {
        const newBike = {
          id,
          date: Date.now(),
        };

        if (old.rentedBikes?.length) {
          return { ...old, rentedBikes: [...old.rentedBikes, newBike] };
        } else {
          return { ...old, rentedBikes: [newBike] };
        }
      });
    },
    onError: (error: string) => Alert.alert("Error", error),
  });
};
