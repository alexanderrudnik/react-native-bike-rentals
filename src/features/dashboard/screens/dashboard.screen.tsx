import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountStackParamList } from "../../account/screens/account.screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysEnum } from "../../../common/models/storage-keys.enum";
import { queryClient } from "../../../common/query-client/query-client";
import { QueryKeysEnum } from "../../../common/models/query-keys.enum";
import { Button } from "react-native-paper";
import { useAccount } from "../../../common/hooks/useAccount";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { Container } from "../../../common/components/Container/container.component";

type Props = NativeStackScreenProps<AccountStackParamList, "Dashboard">;

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { data: account } = useAccount();

  const logout = async () => {
    await AsyncStorage.removeItem(StorageKeysEnum.ACCESS_TOKEN);
    await queryClient.setQueryData(QueryKeysEnum.ACCOUNT, undefined);
  };

  return (
    <Container>
      <Spacer position="bottom" size="lg">
        <Button mode="text" onPress={() => navigation.navigate("Rented bikes")}>
          Rented bikes
        </Button>
      </Spacer>
      {account?.role === "admin" && (
        <>
          <Spacer position="bottom" size="lg">
            <Button
              mode="text"
              onPress={() => navigation.navigate("All users")}
            >
              All users
            </Button>
          </Spacer>

          <Spacer position="bottom" size="lg">
            <Button
              mode="text"
              onPress={() => navigation.navigate("Users who reserved a bike")}
            >
              Users, who reserved a bike
            </Button>
          </Spacer>

          <Spacer position="bottom" size="lg">
            <Button
              mode="text"
              onPress={() => navigation.navigate("Bikes, reserved by users")}
            >
              Bikes, reserved by users
            </Button>
          </Spacer>
        </>
      )}

      <Button mode="contained" onPress={logout}>
        Log out
      </Button>
    </Container>
  );
};
