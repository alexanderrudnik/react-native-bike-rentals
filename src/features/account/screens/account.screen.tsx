import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "../../signup/screens/signup.screen";
import { LoginScreen } from "../../login/screens/login.screen";
import { DashboardScreen } from "../../dashboard/screens/dashboard.screen";
import { useAccount } from "../../../common/hooks/useAccount";
import { Loading } from "../../../common/components/Loading/loading.component";
import { RentedBikesScreen } from "../../rented-bikes/screens/rented-bikes.screen";

export type AccountStackParamList = {
  Signup: undefined;
  Login: undefined;
  Dashboard: undefined;
  "Rented bikes": undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountScreen: React.FC = () => {
  const { data: account, isLoading } = useAccount();

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <Stack.Navigator initialRouteName={"Signup"}>
      {account ? (
        <>
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerBackVisible: false }}
          />
          <Stack.Screen name="Rented bikes" component={RentedBikesScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerBackVisible: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerBackVisible: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
