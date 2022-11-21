import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountStackParamList } from "../../account/screens/account.screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysEnum } from "../../../common/models/storage-keys.enum";
import { queryClient } from "../../../../App";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { useAccount } from "../../../common/hooks/useAccount";

type Props = NativeStackScreenProps<AccountStackParamList, "Dashboard">;

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { data: account } = useAccount();

  const logout = async () => {
    await AsyncStorage.removeItem(StorageKeysEnum.ACCESS_TOKEN);
    await queryClient.setQueryData(QueryKeysEnum.ACCOUNT, undefined);
  };

  return (
    <View>
      <Button mode="text" onPress={() => navigation.navigate("Rented bikes")}>
        Rented bikes
      </Button>
      {account?.role === "admin" && (
        <>
          <Button mode="text" onPress={() => navigation.navigate("All users")}>
            All users
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Users who reserved a bike")}
          >
            Users, who reserved a bike
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Bikes, reserved by users")}
          >
            Bikes, reserved by users
          </Button>
        </>
      )}
      <Button onPress={logout}>Log out</Button>
    </View>
  );
};
