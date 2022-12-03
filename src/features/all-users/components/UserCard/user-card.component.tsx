import React from "react";
import { Button, Text } from "react-native-paper";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { User } from "../../../../services/user/user.types";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import * as S from "./user-card.styles";

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const { mutateAsync: deleteUser } = useDeleteUser();

  const isDisabled = user.role === "admin";

  return (
    <Card>
      <Spacer position="bottom" size="md">
        <S.Row>
          <Spacer position="right" size="md">
            <Text>Email:</Text>
          </Spacer>

          <Text>{user.email}</Text>
        </S.Row>
      </Spacer>

      <Button
        disabled={isDisabled}
        mode="outlined"
        onPress={() => deleteUser(user.id)}
      >
        Delete account
      </Button>
    </Card>
  );
};
