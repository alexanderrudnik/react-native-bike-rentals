import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useAccounts } from "../../all-users/hooks/useAccounts";
import { NoData } from "../../bikes-list/components/NoData/no-data.component";
import useBikesList from "../../bikes-list/hooks/useBikesList";
import { BikesUsersCard } from "../components/BikesUsersCard/bikes-users-card.component";

export const BikesUsersScreen: React.FC = () => {
  const { data: bikes, isLoading: isLoadingBikes } = useBikesList();
  const { data: accounts, isLoading: isLoadingUsers } = useAccounts();

  const rentedBikes = bikes ? bikes.filter((bike) => bike.rented?.length) : [];

  return (
    <Container>
      {isLoadingBikes || isLoadingUsers ? (
        <Loading size="large" />
      ) : (
        accounts && (
          <FlatList
            ListEmptyComponent={NoData}
            data={rentedBikes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Spacer position="bottom" size="lg">
                <BikesUsersCard bike={item} accounts={accounts} />
              </Spacer>
            )}
          />
        )
      )}
    </Container>
  );
};
