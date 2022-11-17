import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BikesListScreen } from "./src/features/bikes-list/screens/bikes-list.screen";
import { AccountScreen } from "./src/features/account/screens/account.screen";
import { SettingsScreen } from "./src/features/settings/screens/settings.screen";

import { store } from "./src/app/store/store";

const Tab = createBottomTabNavigator();

const TAB_ICON: {
  [key: string]: string;
} = {
  Bikes: "md-bicycle",
  Account: "md-person",
  Settings: "md-settings",
};

const getScreenOptions = ({
  route,
}: {
  route: {
    name: string;
  };
}) => ({
  tabBarIcon: ({ size, color }: { size: number; color: string }) => {
    const tabIcon = TAB_ICON[route.name];

    return <Ionicons name={tabIcon} size={size} color={color} />;
  },
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={getScreenOptions}>
          <Tab.Screen name="Bikes" component={BikesListScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
