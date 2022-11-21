import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { useAccounts } from "../../all-users/hooks/useAccounts";
import { NoData } from "../../bikes-list/components/NoData/no-data.component";
import useBikesList from "../../bikes-list/hooks/useBikesList";
import { UsersBikesCard } from "../components/UsersBikesCard/users-bikes-card.component";

export const UsersBikesScreen: React.FC = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useAccounts();
  const { data: bikes, isLoading: isLoadingBikes } = useBikesList();

  return (
    <Container>
      {isLoadingAccounts || isLoadingBikes ? (
        <Loading size="large" />
      ) : (
        bikes && (
          <FlatList
            ListEmptyComponent={NoData}
            keyExtractor={(item) => item.id.toString()}
            data={accounts}
            renderItem={({ item }) => (
              <UsersBikesCard bikes={bikes} account={item} />
            )}
          />
        )
      )}
    </Container>
  );
};
