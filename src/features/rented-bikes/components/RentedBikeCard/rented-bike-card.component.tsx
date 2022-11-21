import React from "react";
import { Button, Text } from "react-native-paper";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { RentedBike } from "../../../../services/bikes/bikes.types";
import { Bike } from "../../../bikes-list/models/bike.model";
import { useCancelBike } from "../../hooks/useCancelBike";
import * as S from "./rented-bike-card.styles";

interface Props {
  now: number;
  bike: Bike;
  rentDetails: RentedBike;
}

export const RentedBikeCard: React.FC<Props> = ({ now, bike, rentDetails }) => {
  const isCancellable = rentDetails.dateTo ? now < rentDetails.dateTo : true;

  const { mutateAsync: cancelBike } = useCancelBike();

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
        <S.Row>
          <Spacer position="right" size="md">
            <Text>Date from:</Text>
          </Spacer>
          <Text>{new Date(rentDetails.dateFrom).toLocaleString("en-US")}</Text>
        </S.Row>
      </Spacer>

      <Spacer position="bottom" size={isCancellable ? "lg" : "none"}>
        <S.Row>
          <Spacer position="right" size="md">
            <Text>Date to:</Text>
          </Spacer>
          <Text>
            {rentDetails.dateTo
              ? new Date(rentDetails.dateTo).toLocaleString("en-US")
              : "Unlimited"}
          </Text>
        </S.Row>
      </Spacer>

      {isCancellable && (
        <Button
          mode="outlined"
          onPress={() => cancelBike({ bike, dateFrom: rentDetails.dateFrom })}
        >
          Cancel
        </Button>
      )}
    </Card>
  );
};
