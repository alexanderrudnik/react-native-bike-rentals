import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Account } from "../../../../services/account/account.types";
import { dateService } from "../../../../services/date/date.service";
import { Bike } from "../../../bikes-list/models/bike.model";
import * as S from "./users-bikes-card.styles";

interface Props {
  account: Account;
  bikes: Bike[];
}

export const UsersBikesCard: React.FC<Props> = ({ account, bikes }) => {
  const header = ["Model", "Date to", "Date from"];
  const data =
    account?.rentedBikes &&
    account.rentedBikes.map((rentedBike) => [
      bikes.find((bike) => bike.id === rentedBike.id)?.model,
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

          <Text>{account.email}</Text>
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
