import React from "react";
import * as S from "./rating.styles";

interface RatingProps {
  rate: number;
}

export const Rating: React.FC<RatingProps> = ({ rate }) => {
  return (
    <S.Row>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rate ? (
          <S.Icon name="star" color="#FDCC0D" size={20} />
        ) : (
          <S.Icon name="star-outline" size={20} />
        )
      )}
    </S.Row>
  );
};
