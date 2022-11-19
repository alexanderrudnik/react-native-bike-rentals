import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "../../signup/screens/signup.screen";
import { LoginScreen } from "../../login/screens/login.screen";

export type AccountStackParamList = {
  Signup: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
};
