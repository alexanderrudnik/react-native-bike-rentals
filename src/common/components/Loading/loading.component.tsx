import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native-paper";
import * as S from "./loading.styles";

interface Props {
  size: ActivityIndicatorProps["size"];
}

export const Loading: React.FC<Props> = () => {
  return (
    <S.Wrapper>
      <ActivityIndicator />
    </S.Wrapper>
  );
};
