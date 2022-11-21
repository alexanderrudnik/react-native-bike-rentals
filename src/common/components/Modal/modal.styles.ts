import { Modal } from "react-native-paper";
import styled from "styled-components/native";

export const BaseModal = styled(Modal)`
  background-color: #ffffff;
  padding: 14px;
  z-index: 1;
  elevation: 1;
`;

export const CloseView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
