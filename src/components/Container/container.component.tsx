import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;

  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
`;

const MainContainer = styled.View`
  flex: 1;

  padding: 0 14px;
`;

interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaContainer>
      <MainContainer>{children}</MainContainer>
    </SafeAreaContainer>
  );
};
