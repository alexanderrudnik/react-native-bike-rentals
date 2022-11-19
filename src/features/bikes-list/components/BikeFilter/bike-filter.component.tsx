import React, { useState } from "react";
import { View } from "react-native";
import { FilterProps } from "../../models/filter.model";
import { BikeFilterModal } from "../BikeFilterModal/bike-filter-modal.component";
import * as S from "./bike-filter.styles";

interface Props extends FilterProps {}

export const BikeFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <View>
      <S.FilterButton mode="outlined" onPress={() => setIsFilterVisible(true)}>
        Filter
      </S.FilterButton>

      <BikeFilterModal
        filter={filter}
        visible={isFilterVisible}
        setIsVisible={setIsFilterVisible}
        setFilter={setFilter}
      />
    </View>
  );
};
