import React from "react";
import styled from "styled-components/native";

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface Props {
  children: React.ReactNode;
}

export const Center: React.FC<Props> = ({ children }) => {
  return <CenterView>{children}</CenterView>;
};
