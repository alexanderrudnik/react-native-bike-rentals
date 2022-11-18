import React from "react";
import { PaperSelect } from "react-native-paper-select";

export const ColorSelect: React.FC = () => {
  return (
    <PaperSelect
      value={selectedColors.value}
      onSelection={(value: any) => {
        setSelectedColors({
          ...selectedColors,
          value: value.text,
          selectedList: value.selectedList,
        });
      }}
      selectedArrayList={selectedColors.selectedList}
      multiEnable
      errorText=""
      label="Color"
      arrayList={colorsOptions}
    />
  );
};
