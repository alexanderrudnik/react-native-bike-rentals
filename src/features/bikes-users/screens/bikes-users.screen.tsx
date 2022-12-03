import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useAllUsers } from "../../all-users/hooks/useAllUsers";
import { NoData } from "../../bikes-list/components/NoData/no-data.component";
import { useBikes } from "../../bikes-list/hooks/useBikes";
import { BikesUsersCard } from "../components/BikesUsersCard/bikes-users-card.component";

export const BikesUsersScreen: React.FC = () => {
  const { data: bikes, isLoading: isLoadingBikes } = useBikes();
  const { data: users, isLoading: isLoadingUsers } = useAllUsers();

  const rentedBikes = bikes ? bikes.filter((bike) => bike.history?.length) : [];

  return (
    <Container>
      {isLoadingBikes || isLoadingUsers ? (
        <Loading size="large" />
      ) : (
        users && (
          <FlatList
            ListEmptyComponent={NoData}
            data={rentedBikes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Spacer position="bottom" size="lg">
                <BikesUsersCard bike={item} users={users} />
              </Spacer>
            )}
          />
        )
      )}
    </Container>
  );
};
