import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { queryClient } from "../../../../App";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import accountAPI from "../../../services/account/account.api";
import { Account } from "../../../services/account/account.types";

const deleteAccount = async (id: number) => {
  try {
    const response = await accountAPI.deleteUser(id);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error?.response?.data || "Something went wrong";
  }
};

export const useDeleteAccount = () => {
  return useMutation(deleteAccount, {
    onSuccess: async (_, id) => {
      await queryClient.setQueryData(
        QueryKeysEnum.ACCOUNTS,
        (old: Account[]) => {
          return old.filter((acc) => acc.id !== id);
        }
      );
    },
    onError: (error: string) => Alert.alert("Error", error),
  });
};
