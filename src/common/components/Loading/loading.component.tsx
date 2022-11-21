import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native-paper";
import { Center } from "../Center/center.component";

interface Props {
  size: ActivityIndicatorProps["size"];
}

export const Loading: React.FC<Props> = ({ ...props }) => {
  return (
    <Center>
      <ActivityIndicator {...props} />
    </Center>
  );
};
