import React from "react";
import * as S from "./card.styles";

interface Props {
  children: React.ReactNode;
}

export const Card: React.FC<Props> = ({ children }) => {
  return <S.StyledCard>{children}</S.StyledCard>;
};
