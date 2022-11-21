import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useAccount } from "../../../common/hooks/useAccount";
import { dateService } from "../../../services/date/date.service";
import { NoData } from "../../bikes-list/components/NoData/no-data.component";
import useBikesList from "../../bikes-list/hooks/useBikesList";
import { RentedBikeCard } from "../components/RentedBikeCard/rented-bike-card.component";

let id: ReturnType<typeof setInterval>;

export const RentedBikesScreen: React.FC = () => {
  const { data: bikes } = useBikesList();
  const { data: account } = useAccount();

  const [now, setNow] = useState(dateService.getNow());

  useEffect(() => {
    id = setInterval(() => {
      setNow(dateService.getNow());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const bikesList = bikes || [];

  return (
    <Container>
      <FlatList
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={NoData}
        data={account?.rentedBikes || []}
        renderItem={({ item }) => {
          const currentBike = bikesList.find((bike) => bike.id === item.id);

          return currentBike ? (
            <Spacer position="bottom" size="lg">
              <RentedBikeCard now={now} bike={currentBike} rentDetails={item} />
            </Spacer>
          ) : null;
        }}
      />
    </Container>
  );
};
