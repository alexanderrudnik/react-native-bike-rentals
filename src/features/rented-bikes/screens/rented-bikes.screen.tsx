import React, { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useMe } from "../../../common/hooks/useMe";
import { useNow } from "../../../common/hooks/useNow";
import { UserRent } from "../../../services/user/user.types";
import { NoData } from "../../bikes-list/components/NoData/no-data.component";
import { useBikes } from "../../bikes-list/hooks/useBikes";
import { RateBikeModal } from "../components/RateBikeModal/rate-bike-modal.component";
import { RentedBikeCard } from "../components/RentedBikeCard/rented-bike-card.component";
import { useCancelBike } from "../hooks/useCancelBike";

export const RentedBikesScreen: React.FC = () => {
  const { data: bikes } = useBikes();
  const { data: user } = useMe();
  const { mutate: cancelBike } = useCancelBike();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeBike, setActiveBike] = useState<UserRent | null>(null);

  const { now } = useNow();

  const bikesList = useMemo(() => bikes || [], [bikes]);
  const history = useMemo(
    () => [...(user?.history || [])].reverse(),
    [user?.history]
  );

  return (
    <Container>
      <FlatList
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={NoData}
        data={history || []}
        renderItem={({ item }) => {
          const currentBike = bikesList.find((bike) => bike.id === item.bikeID);

          const isCancellable = item.dateTo ? now < item.dateTo : true;

          const isRateable = Boolean(
            !currentBike?.ratings.find(
              (bikeRating) => bikeRating.userID === user?.id
            ) && !isCancellable
          );

          return currentBike ? (
            <Spacer position="bottom" size="lg">
              <RentedBikeCard
                now={now}
                bike={currentBike}
                rentDetails={item}
                isCancellable={isCancellable}
                onCancel={() => cancelBike({ rideID: item.id })}
                isRateable={isRateable}
                onRate={() => {
                  setIsModalVisible(true);
                  setActiveBike(item);
                }}
              />
            </Spacer>
          ) : null;
        }}
      />

      <RateBikeModal
        rentedBike={activeBike}
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setActiveBike(null);
        }}
      />
    </Container>
  );
};
