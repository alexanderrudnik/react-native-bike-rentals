import React from "react";
import { View } from "react-native";
import { Checkbox, Text, Title } from "react-native-paper";
import { FilterProps } from "../../models/filter.model";
import * as S from "./bike-filter-color.styles";

interface Props extends FilterProps {
  colors: string[];
}

export const BikeFilterColor: React.FC<Props> = ({
  colors,
  filter,
  setFilter,
}) => {
  return (
    <View>
      <Title>Color:</Title>
      {colors.map((color) => (
        <S.Row
          key={color}
          onPress={() =>
            setFilter((prev) => ({
              ...prev,
              color: prev.color.includes(color)
                ? prev.color.filter((stateColor) => stateColor !== color)
                : [...prev.color, color],
            }))
          }
        >
          <Text>{color}</Text>

          <Checkbox
            status={filter.color.includes(color) ? "checked" : "unchecked"}
          />
        </S.Row>
      ))}
    </View>
  );
};
