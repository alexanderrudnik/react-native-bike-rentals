import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import userAPI from "../../../services/user/user.api";
import { User } from "../../../services/user/user.types";

const deleteUser = async (id: number) => {
  try {
    const { data } = await userAPI.deleteUser(id);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useDeleteUser = () => {
  return useMutation(deleteUser, {
    onSuccess: async (_, id) => {
      await queryClient.setQueryData(QueryKeysEnum.USERS, (users: any) => {
        return users.filter((user: User) => user.id !== id);
      });
    },
    onError: (error: string) => Alert.alert(error || "Failed to delete user"),
  });
};
