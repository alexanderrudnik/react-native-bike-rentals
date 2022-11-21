import React from "react";
import { Text, Title } from "react-native-paper";
import { Center } from "../../../../common/components/Center/center.component";

interface Props {
  additionalText?: string;
}

export const NoData: React.FC<Props> = ({ additionalText }) => {
  return (
    <Center>
      <Title>Oops, looks like there is no data :(</Title>
      {additionalText && <Text>{additionalText}</Text>}
    </Center>
  );
};
