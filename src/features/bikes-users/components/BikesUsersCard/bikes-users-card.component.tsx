import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Bike } from "../../../../services/bikes/bikes.types";
import { dateService } from "../../../../services/date/date.service";
import { User } from "../../../../services/user/user.types";
import * as S from "./bikes-users-card.styles";

interface Props {
  bike: Bike;
  users: User[];
}

export const BikesUsersCard: React.FC<Props> = ({ bike, users }) => {
  const header = ["Email", "Date from", "Date to"];
  const data = bike.history?.map((bikeRent) => [
    users.find((user) => user.id === bikeRent.userID)?.email,
    dateService.format(bikeRent.dateFrom),
    bikeRent.dateTo ? dateService.format(bikeRent.dateTo) : "Unlimited",
  ]);

  return (
    <Card>
      <Spacer position="bottom" size="lg">
        <S.Row>
          <Spacer position="right" size="md">
            <Text>Model:</Text>
          </Spacer>

          <Text>{bike.model}</Text>
        </S.Row>
      </Spacer>

      <View>
        <Spacer position="bottom" size="sm">
          <Text>Rented by:</Text>
        </Spacer>

        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row data={header} />
          <Rows data={data} />
        </Table>
      </View>
    </Card>
  );
};
