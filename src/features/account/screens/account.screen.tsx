import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "../../signup/screens/signup.screen";
import { LoginScreen } from "../../login/screens/login.screen";
import { DashboardScreen } from "../../dashboard/screens/dashboard.screen";
import { useAccount } from "../../../common/hooks/useAccount";
import { Loading } from "../../../common/components/Loading/loading.component";

export type AccountStackParamList = {
  Signup: undefined;
  Login: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountScreen: React.FC = () => {
  const { data: user, isLoading } = useAccount();

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <Stack.Navigator initialRouteName={"Signup"}>
      {user ? (
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerBackVisible: false }}
        />
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
