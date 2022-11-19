import { Snackbar, TextInput } from "react-native-paper";
import styled from "styled-components/native";

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled(TextInput)`
  width: 48%;
`;

export const Snack = styled(Snackbar)`
  z-index: 1;
  elevation: 1;
`;
