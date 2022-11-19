import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BikesListScreen } from "./src/features/bikes-list/screens/bikes-list.screen";
import { AccountScreen } from "./src/features/account/screens/account.screen";
import { SettingsScreen } from "./src/features/settings/screens/settings.screen";

import { QueryClient, QueryClientProvider } from "react-query";

type RootTabParamList = {
  Bikes: undefined;
  Account: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const queryClient = new QueryClient();

const TAB_ICON = {
  Bikes: "bicycle",
  Account: "person",
  Settings: "settings",
};

const getScreenOptions = ({
  route,
}: {
  route: {
    name: string;
  };
}) => ({
  tabBarIcon: ({ size, color }: { size: number; color: string }) => {
    const tabIcon = (TAB_ICON as any)[route.name];

    return <Ionicons name={tabIcon} size={size} color={color} />;
  },
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={getScreenOptions}>
            <Tab.Screen name="Bikes" component={BikesListScreen} />
            <Tab.Screen
              name="Account"
              component={AccountScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>

          <StatusBar style="auto" />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
