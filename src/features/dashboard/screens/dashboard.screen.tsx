import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { AccountStackParamList } from "../../account/screens/account.screen";
import { StorageKeysEnum } from "../../../common/models/storage-keys.enum";
import { queryClient } from "../../../../App";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";

type Props = NativeStackScreenProps<AccountStackParamList, "Dashboard">;

export const DashboardScreen: React.FC<Props> = ({}) => {
  const logout = async () => {
    await AsyncStorage.removeItem(StorageKeysEnum.ACCESS_TOKEN);
    await queryClient.setQueryData(QueryKeysEnum.ACCOUNT, undefined);
  };

  return (
    <View>
      <Text>dashboard</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};
