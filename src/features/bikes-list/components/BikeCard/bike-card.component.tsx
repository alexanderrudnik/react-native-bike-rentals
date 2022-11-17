import React from "react";
import { Text } from "react-native";
import { Title, Card, Button } from "react-native-paper";
import { Rating } from "../../../../components/Rating/rating.component";
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
      <S.Info>
        <Title>
          {bike.model} ({bike.color})
        </Title>
        <Text>{bike.location}</Text>
        <Rating rate={bike.rating} />
        <Button disabled={!isBikeAvailable}>Rent now!</Button>
      </S.Info>
    </S.Card>
  );
};
