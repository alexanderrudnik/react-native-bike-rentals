import React from "react";
import { Button, Text } from "react-native-paper";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { RentedBike } from "../../../../services/bikes/bikes.types";
import { dateService } from "../../../../services/date/date.service";
import { Bike } from "../../../bikes-list/models/bike.model";
import { useCancelBike } from "../../hooks/useCancelBike";
import * as S from "./rented-bike-card.styles";

interface Props {
  now: number;
  bike: Bike;
  rentDetails: RentedBike;
  rated?: number;
  onRate: () => void;
}

export const RentedBikeCard: React.FC<Props> = ({
  now,
  bike,
  rentDetails,
  rated,
  onRate,
}) => {
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
          <Text>{dateService.format(rentDetails.dateFrom)}</Text>
        </S.Row>
      </Spacer>

      <Spacer position="bottom" size={"lg"}>
        <S.Row>
          <Spacer position="right" size="md">
            <Text>Date to:</Text>
          </Spacer>
          <Text>
            {rentDetails.dateTo
              ? dateService.format(rentDetails.dateTo)
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

      {!rated && !isCancellable && (
        <Button mode="outlined" onPress={onRate}>
          Rate this bike!
        </Button>
      )}
    </Card>
  );
};
