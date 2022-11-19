import React from "react";
import { Text, Title } from "react-native-paper";
import { Center } from "../../../../common/components/Center/center.component";

export const NoData: React.FC = () => {
  return (
    <Center>
      <Title>Oops, looks like there is no data :(</Title>
      <Text>Please try to update your filter query.</Text>
    </Center>
  );
};
