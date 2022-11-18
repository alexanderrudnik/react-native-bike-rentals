import React from "react";
import { Text } from "react-native";
import { Title, Card, Button } from "react-native-paper";
import { Rating } from "../../../../common/components/Rating/rating.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Bike } from "../../models/bike.model";
import * as S from "./bike-card.styles";

interface Props {
  bike: Bike;
}

export const BikeCard: React.FC<Props> = ({ bike }) => {
  const isBikeAvailable = bike.available;

  return (
    <S.Card>
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
        <Button mode="contained" disabled={!isBikeAvailable}>
          Rent now
        </Button>
      </Spacer>
    </S.Card>
  );
};
