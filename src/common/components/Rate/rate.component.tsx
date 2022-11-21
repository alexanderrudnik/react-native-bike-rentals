import React from "react";
import { IconButton } from "react-native-paper";
import * as S from "./rate.styles";

interface Props {
  value: number | null | undefined;
  onChange: (value: number) => void;
}

export const Rate: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (i: number) => onChange(i + 1);

  return (
    <S.Row>
      {Array.from({ length: 5 }).map((_, i) =>
        value && i < value ? (
          <IconButton
            key={i}
            icon="star"
            color="#FDCC0D"
            onPress={() => handleChange(i)}
          />
        ) : (
          <IconButton
            key={i}
            icon="star-outline"
            onPress={() => handleChange(i)}
          />
        )
      )}
    </S.Row>
  );
};
