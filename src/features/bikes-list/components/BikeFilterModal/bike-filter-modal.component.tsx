import React, { useMemo } from "react";
import { Button } from "react-native-paper";
import { FilterProps } from "../../models/filter.model";
import { BikeFilterColor } from "../BikeFilterColor/bike-filter-color.component";
import { BikeFilterModel } from "../BikeFilterModel/bike-filter-model.component";
import { BikeFilterLocation } from "../BikeFilterLocation/bike-filter-location.component";
import { BikeFilterRating } from "../BikeFilterRating/bike-filter-rating.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { filterInitialState } from "../../constants/filter-initial-state";
import { Modal } from "../../../../common/components/Modal/modal.component";
import { useBikes } from "../../hooks/useBikes";

interface Props extends FilterProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BikeFilterModal: React.FC<Props> = ({
  visible,
  setIsVisible,
  filter,
  setFilter,
}) => {
  const { data: bikes } = useBikes();

  const { colors, models } = useMemo(() => {
    if (bikes) {
      return {
        colors: Array.from(new Set(bikes.map((bike) => bike.color))),

        models: Array.from(new Set(bikes.map((bike) => bike.model))),
      };
    }

    return {
      colors: [],
      models: [],
    };
  }, [bikes]);

  const handleClear = () => {
    setFilter(filterInitialState);
    setIsVisible(false);
  };

  return (
    <Modal visible={visible} onDismiss={() => setIsVisible(false)}>
      <Spacer position="bottom" size="md">
        <BikeFilterModel
          models={models}
          filter={filter}
          setFilter={setFilter}
        />
      </Spacer>

      <Spacer position="bottom" size="md">
        <BikeFilterColor
          colors={colors}
          filter={filter}
          setFilter={setFilter}
        />
      </Spacer>

      <Spacer position="bottom" size="md">
        <BikeFilterLocation filter={filter} setFilter={setFilter} />
      </Spacer>

      <Spacer position="bottom" size="xl">
        <BikeFilterRating filter={filter} setFilter={setFilter} />
      </Spacer>

      <Button mode="outlined" onPress={handleClear}>
        Clear filter
      </Button>
    </Modal>
  );
};
