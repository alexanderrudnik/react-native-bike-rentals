import React from "react";
import { View } from "react-native";
import { Checkbox, Title } from "react-native-paper";
import { FilterProps } from "../../models/filter.model";
import * as S from "./bike-filter-color.styles";

interface Props extends FilterProps {
  models: string[];
}

export const BikeFilterModel: React.FC<Props> = ({
  models,
  filter,
  setFilter,
}) => {
  return (
    <View>
      <Title>Model:</Title>
      {models.map((model) => (
        <S.Row
          key={model}
          onPress={() =>
            setFilter((prev) => ({
              ...prev,
              model: prev.model.includes(model)
                ? prev.model.filter((stateModel) => stateModel !== model)
                : [...prev.model, model],
            }))
          }
        >
          <S.ColorText>{model}</S.ColorText>

          <Checkbox
            status={filter.model.includes(model) ? "checked" : "unchecked"}
          />
        </S.Row>
      ))}
    </View>
  );
};
