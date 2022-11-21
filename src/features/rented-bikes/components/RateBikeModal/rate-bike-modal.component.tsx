import React, { useState } from "react";
import { Button, Title } from "react-native-paper";
import styled from "styled-components/native";
import { Center } from "../../../../common/components/Center/center.component";
import { Modal } from "../../../../common/components/Modal/modal.component";
import { Rate } from "../../../../common/components/Rate/rate.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { RentedBike } from "../../../../services/bikes/bikes.types";
import { useRateBike } from "../../hooks/useRateBike";

interface Props {
  rentedBike: RentedBike | null;
  isVisible: boolean;
  onClose: () => void;
}

const StyledButton = styled(Button)`
  width: 100%;
`;

export const RateBikeModal: React.FC<Props> = ({
  isVisible,
  onClose,
  rentedBike,
}) => {
  const [rating, setRating] = useState<number | null>(null);

  const { mutateAsync: rateBike } = useRateBike();

  return (
    <Modal
      visible={isVisible}
      onDismiss={() => {
        onClose();
        setRating(null);
      }}
    >
      <Center>
        <Title>How would you rate this bike?</Title>

        <Spacer position="bottom" size="lg">
          <Rate value={rating} onChange={setRating} />
        </Spacer>

        <StyledButton
          mode="contained"
          onPress={() => {
            if (rating && rentedBike?.dateFrom) {
              rateBike({ rating, dateFrom: rentedBike?.dateFrom });
              setRating(null);
              onClose();
            }
          }}
        >
          Rate!
        </StyledButton>
      </Center>
    </Modal>
  );
};
