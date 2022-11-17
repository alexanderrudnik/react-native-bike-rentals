import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { AppDispatch } from "../../../app/store/store";
import { Container } from "../../../components/Container/container.component";
import { BikeCard } from "../components/BikeCard/bike-card.component";
import { getBikes, selectBikesList } from "../slices/bikes-list.slice";

const CardWrapper = styled(View)`
  margin-top: 14px;
  margin-bottom: 14px;
`;

export const BikesListScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bikes = useSelector(selectBikesList);

  useEffect(() => {
    dispatch(getBikes());
  }, [dispatch]);

  return (
    <Container>
      {/* <FlatList
        data={bikes}
        renderItem={({ item }) => (
          <CardWrapper>
            <BikeCard bike={item} />
          </CardWrapper>
        )}
        keyExtractor={(bike) => bike.id.toString()}
      /> */}

      <Text>test</Text>

      <Text>{JSON.stringify(bikes)}</Text>
    </Container>
  );
};
