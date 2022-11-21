import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountStackParamList } from "../../account/screens/account.screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysEnum } from "../../../common/models/storage-keys.enum";
import { queryClient } from "../../../../App";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { Button } from "react-native-paper";
import { View } from "react-native";

type Props = NativeStackScreenProps<AccountStackParamList, "Dashboard">;

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.removeItem(StorageKeysEnum.ACCESS_TOKEN);
    await queryClient.setQueryData(QueryKeysEnum.ACCOUNT, undefined);
  };

  return (
    <View>
      <Button mode="text" onPress={() => navigation.navigate("Rented bikes")}>
        Rented bikes
      </Button>
      <Button onPress={logout}>Log out</Button>
    </View>
  );
};
