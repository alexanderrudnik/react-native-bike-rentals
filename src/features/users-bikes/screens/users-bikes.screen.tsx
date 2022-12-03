import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { useAllUsers } from "../../all-users/hooks/useAllUsers";
import { NoData } from "../../bikes-list/components/NoData/no-data.component";
import { useBikes } from "../../bikes-list/hooks/useBikes";
import { UsersBikesCard } from "../components/UsersBikesCard/users-bikes-card.component";

export const UsersBikesScreen: React.FC = () => {
  const { data: users, isLoading: isLoadingUsers } = useAllUsers();
  const { data: bikes, isLoading: isLoadingBikes } = useBikes();

  const usersWithBikes = users
    ? users.filter((user) => user.history?.length)
    : [];

  return (
    <Container>
      {isLoadingUsers || isLoadingBikes ? (
        <Loading size="large" />
      ) : (
        bikes && (
          <FlatList
            ListEmptyComponent={NoData}
            keyExtractor={(item) => item.id.toString()}
            data={usersWithBikes}
            renderItem={({ item }) => (
              <Spacer position="bottom" size="lg">
                <UsersBikesCard bikes={bikes} user={item} />
              </Spacer>
            )}
          />
        )
      )}
    </Container>
  );
};
