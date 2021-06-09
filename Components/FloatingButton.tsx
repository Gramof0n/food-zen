import { MAIN_COLOR } from "../constants";
import React from "react";
import { View, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  Icon: any;
};

const FloatingButton = (props: Props) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        right: 15,
      }}
    >
      <TouchableOpacity
        {...props}
        style={{
          backgroundColor: MAIN_COLOR,
          width: 70,
          height: 70,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
      >
        {props.Icon}
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;
