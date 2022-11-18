import React from "react";
import styled from "styled-components/native";

const MainContainer = styled.View`
  flex: 1;
  padding: 14px;
`;

interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};
