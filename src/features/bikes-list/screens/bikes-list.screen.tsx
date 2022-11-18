import React from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { Container } from "../../../common/components/Container/container.component";
import { Loading } from "../../../common/components/Loading/loading.component";
// import { Spacer } from "../../../common/components/Spacer/spacer.component";
import { BikeCard } from "../components/BikeCard/bike-card.component";
// import { BikeFilter } from "../components/BikeFilter/bike-filter.component";
import useBikesList from "../hooks/useBikesList";

const CardWrapper = styled(View)`
  margin-bottom: 14px;
`;

export const BikesListScreen: React.FC = () => {
  const { data: bikes, isLoading, refetch: getBikes } = useBikesList();

  return (
    <Container>
      {/* <Spacer position="bottom" size="xl">
        <BikeFilter />
      </Spacer> */}

      {isLoading && !bikes ? (
        <Loading size="large" />
      ) : (
        <FlatList
          data={bikes}
          refreshing={false}
          renderItem={({ item }) => (
            <CardWrapper>
              <BikeCard bike={item} />
            </CardWrapper>
          )}
          keyExtractor={(bike) => bike.id.toString()}
          onRefresh={getBikes}
        />
      )}
    </Container>
  );
};
