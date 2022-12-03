import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Bike } from "../../../../services/bikes/bikes.types";
import { dateService } from "../../../../services/date/date.service";
import { User } from "../../../../services/user/user.types";
import * as S from "./users-bikes-card.styles";

interface Props {
  user: User;
  bikes: Bike[];
}

export const UsersBikesCard: React.FC<Props> = ({ user, bikes }) => {
  const header = ["Model", "Date from", "Date to"];
  const data =
    user?.history &&
    user.history.map((rentedBike) => [
      bikes.find((bike) => bike.id === rentedBike.bikeID)?.model,
      dateService.format(rentedBike.dateFrom),
      rentedBike.dateTo ? dateService.format(rentedBike.dateTo) : "Unlimited",
    ]);

  return (
    <Card>
      <Spacer position="bottom" size="md">
        <S.Row>
          <Spacer position="right" size="md">
            <Text>Email:</Text>
          </Spacer>

          <Text>{user.email}</Text>
        </S.Row>
      </Spacer>

      <View>
        <Spacer position="bottom" size="sm">
          <Text>History:</Text>
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
