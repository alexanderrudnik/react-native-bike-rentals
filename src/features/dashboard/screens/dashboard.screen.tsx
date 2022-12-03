import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountStackParamList } from "../../account/screens/account.screen";
import { Button } from "react-native-paper";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { Container } from "../../../common/components/Container/container.component";
import { useMe } from "../../../common/hooks/useMe";
import { useLogout } from "../hooks/useLogout";

type Props = NativeStackScreenProps<AccountStackParamList, "Dashboard">;

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { data: user } = useMe();

  const { mutate: logout } = useLogout();

  return (
    <Container>
      <Spacer position="bottom" size="lg">
        <Button mode="text" onPress={() => navigation.navigate("Rented bikes")}>
          Rented bikes
        </Button>
      </Spacer>
      {user?.role === "admin" && (
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
