import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { FilterProps } from "../../models/filter.model";
import * as S from "./bike-filter-rating.styles";

interface Props extends FilterProps {}

export const BikeFilterRating: React.FC<Props> = ({ filter, setFilter }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (filter.rating[0] && filter.rating[1]) {
      if (parseInt(filter.rating[0], 10) > parseInt(filter.rating[1], 10)) {
        setVisible(true);
      }
    }
  }, [filter.rating, setFilter]);

  return (
    <View>
      <Title>Rating:</Title>
      <S.Row>
        <S.Input
          keyboardType="numeric"
          mode="outlined"
          placeholder="From"
          value={filter.rating[0].toString()}
          onChangeText={(text) =>
            setFilter((prev) => ({
              ...prev,
              rating: [text, filter.rating[1]],
            }))
          }
        />
        <S.Input
          keyboardType="numeric"
          mode="outlined"
          placeholder="To"
          value={filter.rating[1].toString()}
          onChangeText={(text) =>
            setFilter((prev) => ({
              ...prev,
              rating: [filter.rating[0], text],
            }))
          }
        />
      </S.Row>

      <S.Snack
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Dismiss",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        Rating "from" can't be higher than rating "to"!
      </S.Snack>
    </View>
  );
};
