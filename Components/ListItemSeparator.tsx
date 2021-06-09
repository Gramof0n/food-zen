import React from "react";
import { View } from "react-native";

interface Props {}

const ListItemSeparator = (props: Props) => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#C8C8C8",
      }}
    />
  );
};

export default ListItemSeparator;
