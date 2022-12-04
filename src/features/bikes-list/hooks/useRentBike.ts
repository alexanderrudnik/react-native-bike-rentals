import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { useMe } from "../../../common/hooks/useMe";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import bikesAPI from "../../../services/bikes/bikes.api";
import {
  Bike,
  RentBikeDetails,
  RentHistoryItem,
} from "../../../services/bikes/bikes.types";
import { User } from "../../../services/user/user.types";

const rentBike = async (details: RentBikeDetails) => {
  try {
    const { data } = await bikesAPI.rentBike(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useRentBike = () => {
  const { data: user } = useMe();

  return useMutation(rentBike, {
    onSuccess: async (data, { bikeID }) => {
      const newUser = {
        ...user,
        history: user?.history?.length ? [...user.history, data] : [data],
      };

      await queryClient.setQueryData(QueryKeysEnum.USER, () => {
        return newUser;
      });

      await queryClient.setQueryData(QueryKeysEnum.USERS, (users: any) => {
        return users?.length
          ? users.map((dbUser: User) =>
              dbUser.id === user?.id ? newUser : dbUser
            )
          : users;
      });

      await queryClient.setQueryData(QueryKeysEnum.BIKES, (bikes: any) => {
        const newBikeRent: RentHistoryItem = {
          id: data.id,
          userID: user!.id,
          dateFrom: data.dateFrom,
        };

        if (data?.dateTo) {
          newBikeRent.dateTo = data.dateTo;
        }

        return bikes.map((bike: Bike) =>
          bike.id === bikeID
            ? {
                ...bike,
                history: bike?.history?.length
                  ? [...bike.history, newBikeRent]
                  : [newBikeRent],
              }
            : bike
        );
      });
    },
    onError: (error: string) => Alert.alert(error || "Failed to rent the bike"),
  });
};
