import React from "react";
import { View } from "react-native";
import { TextInput, Title } from "react-native-paper";
import { FilterProps } from "../../models/filter.model";

interface Props extends FilterProps {}

export const BikeFilterLocation: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <View>
      <Title>Location:</Title>
      <TextInput
        placeholder="A.e. New York"
        mode="outlined"
        value={filter.location}
        onChangeText={(text) =>
          setFilter((prev) => ({ ...prev, location: text }))
        }
      />
    </View>
  );
};
