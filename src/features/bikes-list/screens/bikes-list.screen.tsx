import React, { useState } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useAccount } from "../../../common/hooks/useAccount";
import { BikeCard } from "../components/BikeCard/bike-card.component";
import { BikeFilter } from "../components/BikeFilter/bike-filter.component";
import { NoData } from "../components/NoData/no-data.component";
import { filterInitialState } from "../constants/filter-initial-state";
import useBikesList from "../hooks/useBikesList";
import { useRentBike } from "../hooks/useRentBike";
import { Bike } from "../models/bike.model";
import { Filter } from "../models/filter.model";

const CardWrapper = styled(View)`
  margin-bottom: 14px;
`;

export const BikesListScreen: React.FC = () => {
  const { data: bikes, isLoading, refetch: getBikes } = useBikesList();

  const { data: account } = useAccount();

  console.log(account);

  const { mutateAsync: rentBike } = useRentBike();

  const [filter, setFilter] = useState<Filter>(filterInitialState);

  const filterByColor = (array: Bike[]) =>
    array.filter((bike) =>
      filter.color.some((color) =>
        bike.color.toLowerCase().includes(color.toLowerCase())
      )
    );

  const filterByModel = (array: Bike[]) =>
    array.filter((bike) =>
      filter.model.some((model) =>
        bike.model.toLowerCase().includes(model.toLowerCase())
      )
    );

  const filterByLocation = (array: Bike[]) =>
    array.filter((bike) =>
      bike.location.toLowerCase().includes(filter.location.toLowerCase())
    );

  const filterByRating = (array: Bike[]) =>
    array.filter(
      (bike) =>
        parseInt(filter.rating[0], 10) <= bike.rating &&
        parseInt(filter.rating[1], 10) >= bike.rating
    );

  const getFilteredBikes = () => {
    if (bikes) {
      let result: Bike[] = bikes;

      result = filter.color.length ? filterByColor(result) : result;
      result = filter.model.length ? filterByModel(result) : result;
      result = filter.location ? filterByLocation(result) : result;
      result =
        filter.rating[0] && filter.rating[1] ? filterByRating(result) : result;

      return result;
    }

    return [];
  };

  const filteredBikes = getFilteredBikes();

  return (
    <Container>
      <Spacer position="bottom" size="xl">
        <BikeFilter filter={filter} setFilter={setFilter} />
      </Spacer>

      {isLoading && !bikes ? (
        <Loading size="large" />
      ) : filteredBikes && filteredBikes.length ? (
        <FlatList
          data={filteredBikes}
          refreshing={false}
          renderItem={({ item }) => (
            <CardWrapper>
              <BikeCard
                bike={item}
                disabled={!account}
                isRented={Boolean(
                  account?.rentedBikes?.find(
                    (rentedBike) => rentedBike.id === item.id
                  )
                )}
                onRent={() => {
                  rentBike(item.id);
                }}
              />
            </CardWrapper>
          )}
          keyExtractor={(bike) => bike.id.toString()}
          onRefresh={getBikes}
        />
      ) : (
        <NoData />
      )}
    </Container>
  );
};
