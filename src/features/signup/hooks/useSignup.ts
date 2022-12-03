import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import authAPI from "../../../services/auth/auth.api";
import { AuthDetails } from "../../../services/auth/auth.types";

const signup = async (details: AuthDetails) => {
  try {
    const { data } = await authAPI.signup(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useSignup = () => {
  return useMutation(signup, {
    onError: (error: string) => Alert.alert(error || "Failed to sign up"),
  });
};
