import React from "react";
import { Text } from "react-native";
import { Title, Card, Button } from "react-native-paper";
import { Rating } from "../../../../common/components/Rating/rating.component";
import { Card as BaseCard } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Bike } from "../../models/bike.model";

interface Props {
  now: number;
  accountID: number | undefined;
  bike: Bike;
  disabled: boolean;
  onRent: () => void;
}

export const BikeCard: React.FC<Props> = ({
  now,
  accountID,
  bike,
  disabled,
  onRent,
}) => {
  const isBikeAvailable = bike.rented
    ? bike.rented.every(
        (rent) => now < rent.dateFrom || (rent.dateTo && now >= rent.dateTo)
      )
    : true;

  const isRentedByMe = bike.rented
    ? bike.rented.some(
        (rent) =>
          now >= rent.dateFrom &&
          (rent.dateTo ? now < rent.dateTo : true) &&
          accountID &&
          rent.accountID === accountID
      )
    : false;

  const isDisabled = !isBikeAvailable || disabled || isRentedByMe;

  return (
    <BaseCard>
      <Card.Cover source={{ uri: bike.photo }} />
      <Spacer position="top" size="md">
        <Title>
          {bike.model} ({bike.color})
        </Title>
      </Spacer>

      <Spacer position="top" size="sm">
        <Text>{bike.location}</Text>
      </Spacer>

      <Spacer position="top" size="md">
        <Rating rate={bike.rating} />
      </Spacer>

      <Spacer position="top" size="lg">
        <Button mode="contained" disabled={isDisabled} onPress={onRent}>
          {disabled
            ? "Please log in to rent it"
            : isRentedByMe
            ? "Rented"
            : !isBikeAvailable
            ? "Not available"
            : "Rent now"}
        </Button>
      </Spacer>
    </BaseCard>
  );
};
