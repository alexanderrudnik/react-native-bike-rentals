import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Modal } from "../../../../common/components/Modal/modal.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Bike } from "../../../../services/bikes/bikes.types";
import { useRentBike } from "../../hooks/useRentBike";

const options = [
  {
    value: 1800000,
    label: "30 minutes",
  },
  {
    value: 3600000,
    label: "1 hour",
  },
  {
    value: 7200000,
    label: "2 hours",
  },
  {
    value: "unlimited",
    label: "Unlimited",
  },
];

interface Props {
  isVisible: boolean;
  onClose: () => void;
  bike: Bike | null;
}

export const BikeRentModal: React.FC<Props> = ({
  isVisible,
  onClose,
  bike,
}) => {
  const { mutateAsync: rentBike } = useRentBike();

  return (
    <Modal visible={isVisible} onDismiss={onClose}>
      <View>
        {bike &&
          options.map((option, i, array) => (
            <Spacer
              key={option.value}
              position="bottom"
              size={i === array.length - 1 ? "none" : "xl"}
            >
              <Button
                mode={i === array.length - 1 ? "contained" : "outlined"}
                onPress={() => {
                  rentBike({ bikeID: bike.id, duration: option.value });
                  onClose();
                }}
              >
                {option.label}
              </Button>
            </Spacer>
          ))}
      </View>
    </Modal>
  );
};
