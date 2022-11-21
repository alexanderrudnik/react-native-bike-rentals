import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { UserCard } from "../components/UserCard/user-card.component";
import { useAccounts } from "../hooks/useAccounts";

export const AllUsersScreen: React.FC = () => {
  const { data: accounts, isLoading } = useAccounts();

  return (
    <Container>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={accounts}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="lg">
              <UserCard account={item} />
            </Spacer>
          )}
        />
      )}
    </Container>
  );
};
