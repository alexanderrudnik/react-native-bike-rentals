import React from "react";
import { Text } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Account } from "../../../../services/account/account.types";
import { dateService } from "../../../../services/date/date.service";
import { Bike } from "../../../bikes-list/models/bike.model";
import * as S from "./bikes-users-card.styles";

interface Props {
  bike: Bike;
  accounts: Account[];
}

export const BikesUsersCard: React.FC<Props> = ({ bike, accounts }) => {
  const header = ["Email", "Date from", "Date to"];
  const data = bike.rented.map((bikeRent) => [
    accounts.find((account) => account.id === bikeRent.accountID)?.email,
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

      <Spacer position="bottom" size="lg">
        <Spacer position="bottom" size="md">
          <Text>Rented by:</Text>
        </Spacer>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row data={header} />
          <Rows data={data} />
        </Table>
      </Spacer>
    </Card>
  );
};
