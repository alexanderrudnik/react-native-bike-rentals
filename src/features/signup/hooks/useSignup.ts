import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import authAPI from "../../../services/auth/auth.api";
import { AuthDetails } from "../../../services/auth/auth.types";

const signup = async (details: AuthDetails) => {
  try {
    const response = await authAPI.signup(details);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error.response?.data || "Something went wrong";
  }
};

export const useSignup = () => {
  return useMutation(signup, {
    onError: (error: string) => Alert.alert("Error", error),
  });
};
