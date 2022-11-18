import React, { useState } from "react";
import { View } from "react-native";
import { BikeFilterModal } from "../BikeFilterModal/bike-filter-modal.component";
import * as S from "./bike-filter.styles";

export const BikeFilter: React.FC = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filters, setFilters] = useState({
    models: "",
    colors: ["red", "black"],
  });

  return (
    <View>
      <S.FilterButton mode="outlined" onPress={() => setIsFilterVisible(true)}>
        Filter
      </S.FilterButton>

      <BikeFilterModal
        visible={isFilterVisible}
        setIsVisible={setIsFilterVisible}
      />
    </View>
  );
};
