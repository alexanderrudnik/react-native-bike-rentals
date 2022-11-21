import React from "react";
import { Button, Text } from "react-native-paper";
import { Card } from "../../../../common/components/Card/card.component";
import { Spacer } from "../../../../common/components/Spacer/spacer.component";
import { Account } from "../../../../services/account/account.types";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import * as S from "./user-card.styles";

interface Props {
  account: Account;
}

export const UserCard: React.FC<Props> = ({ account }) => {
  const { mutateAsync: deleteAccount } = useDeleteAccount();

  const isDisabled = account.role === "admin";

  return (
    <Card>
      <Spacer position="bottom" size="md">
        <S.Row>
          <Spacer position="right" size="md">
            <Text>Email:</Text>
          </Spacer>

          <Text>{account.email}</Text>
        </S.Row>
      </Spacer>

      <Button
        disabled={isDisabled}
        mode="outlined"
        onPress={() => deleteAccount(account.id)}
      >
        Delete account
      </Button>
    </Card>
  );
};
