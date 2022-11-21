import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useAccounts } from "../../all-users/hooks/useAccounts";
import { NoData } from "../../bikes-list/components/NoData/no-data.component";
import useBikesList from "../../bikes-list/hooks/useBikesList";
import { UsersBikesCard } from "../components/UsersBikesCard/users-bikes-card.component";

export const UsersBikesScreen: React.FC = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useAccounts();
  const { data: bikes, isLoading: isLoadingBikes } = useBikesList();

  const accountsWithBikes = accounts
    ? accounts.filter((acc) => acc.rentedBikes?.length)
    : [];

  return (
    <Container>
      {isLoadingAccounts || isLoadingBikes ? (
        <Loading size="large" />
      ) : (
        bikes && (
          <FlatList
            ListEmptyComponent={NoData}
            keyExtractor={(item) => item.id.toString()}
            data={accountsWithBikes}
            renderItem={({ item }) => (
              <Spacer position="bottom" size="lg">
                <UsersBikesCard bikes={bikes} account={item} />
              </Spacer>
            )}
          />
        )
      )}
    </Container>
  );
};
