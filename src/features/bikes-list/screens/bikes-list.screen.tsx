import React, { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useMe } from "../../../common/hooks/useMe";
import { useNow } from "../../../common/hooks/useNow";
import { Bike } from "../../../services/bikes/bikes.types";
import { BikeCard } from "../components/BikeCard/bike-card.component";
import { BikeFilter } from "../components/BikeFilter/bike-filter.component";
import { BikeRentModal } from "../components/BikeRentModal/bike-rent-modal.component";
import { NoData } from "../components/NoData/no-data.component";
import { filterInitialState } from "../constants/filter-initial-state";
import { useBikes } from "../hooks/useBikes";
import { Filter } from "../models/filter.model";
import { getFilteredBikes } from "../utils/FilterService";

export const BikesListScreen: React.FC = () => {
  const { data: bikes, isLoading, refetch: getBikes } = useBikes();
  const { data: user } = useMe();

  const [filter, setFilter] = useState<Filter>(filterInitialState);
  const [activeBike, setActiveBike] = useState<Bike | null>(null);
  const [isVisibleRentModal, setIsVisibleRentModal] = useState(false);

  const { now } = useNow();

  // Filters can be debounced if needed

  const filteredBikes = useMemo(
    () => (bikes ? getFilteredBikes(bikes, filter) : null),
    [bikes, filter]
  );

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

      {isLoading ? (
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
                userID={user?.id}
                bike={item}
                disabled={!user}
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
