import React, { useState } from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useAccount } from "../../../common/hooks/useAccount";
import { useNow } from "../../../common/hooks/useNow";
import { BikeCard } from "../components/BikeCard/bike-card.component";
import { BikeFilter } from "../components/BikeFilter/bike-filter.component";
import { BikeRentModal } from "../components/BikeRentModal/bike-rent-modal.component";
import { NoData } from "../components/NoData/no-data.component";
import { filterInitialState } from "../constants/filter-initial-state";
import useBikesList from "../hooks/useBikesList";
import { Bike } from "../models/bike.model";
import { Filter } from "../models/filter.model";

export const BikesListScreen: React.FC = () => {
  const { data: bikes, isLoading, refetch: getBikes } = useBikesList();
  const { data: account } = useAccount();

  const [filter, setFilter] = useState<Filter>(filterInitialState);
  const [activeBike, setActiveBike] = useState<Bike | null>(null);
  const [isVisibleRentModal, setIsVisibleRentModal] = useState(false);

  const { now } = useNow();

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
      <BikeRentModal
        bike={activeBike}
        isVisible={isVisibleRentModal}
        onClose={() => {
          setIsVisibleRentModal(false);
          setActiveBike(null);
        }}
      />

      {isLoading && !bikes ? (
        <Loading size="large" />
      ) : (
        <FlatList
          ListHeaderComponent={
            <Spacer position="bottom" size="lg">
              <BikeFilter filter={filter} setFilter={setFilter} />
            </Spacer>
          }
          ListEmptyComponent={
            <NoData additionalText="Please try to update your filter query." />
          }
          data={filteredBikes}
          refreshing={false}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="lg">
              <BikeCard
                now={now}
                accountID={account?.id}
                bike={item}
                disabled={!account}
                onRent={() => {
                  setActiveBike(item);
                  setIsVisibleRentModal(true);
                }}
              />
            </Spacer>
          )}
          keyExtractor={(bike) => bike.id.toString()}
          onRefresh={getBikes}
        />
      )}
    </Container>
  );
};
