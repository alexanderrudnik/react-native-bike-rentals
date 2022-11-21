import React from "react";
import { ScrollView } from "react-native";
import { IconButton, ModalProps, Portal } from "react-native-paper";
import * as S from "./modal.styles";

interface Props extends Omit<ModalProps, "theme"> {}

export const Modal: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Portal>
      <S.BaseModal {...props}>
        <ScrollView>
          <S.CloseView>
            <IconButton icon="close" onPress={props.onDismiss} />
          </S.CloseView>

          {children}
        </ScrollView>
      </S.BaseModal>
    </Portal>
  );
};
