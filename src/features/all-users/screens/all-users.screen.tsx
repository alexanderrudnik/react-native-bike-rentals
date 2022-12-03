import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { UserCard } from "../components/UserCard/user-card.component";
import { useAllUsers } from "../hooks/useAllUsers";

export const AllUsersScreen: React.FC = () => {
  const { data: users, isLoading } = useAllUsers();

  return (
    <Container>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={users}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="lg">
              <UserCard user={item} />
            </Spacer>
          )}
        />
      )}
    </Container>
  );
};
