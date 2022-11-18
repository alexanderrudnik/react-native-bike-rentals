import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useSelector } from "react-redux";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { selectBikesList } from "../../slices/bikes-list.slice";

interface Props {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BikeFilterModal: React.FC<Props> = ({ visible, setIsVisible }) => {
  const [selectedColors, setSelectedColors] = useState({
    value: "",
    selectedList: [],
  });

  const bikes = useSelector(selectBikesList);

  const { colors, models } = useMemo(() => {
    return {
      colors: Array.from(new Set(bikes.map((bike) => bike.color))).map(
        (color, i) => ({
          _id: (i + 1).toString(),
          value: color,
        })
      ),

      models: Array.from(new Set(bikes.map((bike) => bike.model))).map(
        (model, i) => ({
          _id: (i + 1).toString(),
          value: model,
        })
      ),
    };
  }, [bikes]);

  return (
    <Portal>
      <Modal
        contentContainerStyle={{ padding: 20, backgroundColor: "white" }}
        visible={visible}
        onDismiss={() => setIsVisible(false)}
      >
        <View>
          <Spacer position="bottom" size="md"></Spacer>
        </View>
      </Modal>
    </Portal>
  );
};
