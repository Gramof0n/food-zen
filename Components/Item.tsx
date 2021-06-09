import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Detailed_Product_Type } from "../types";

type Props = {
  base_img_uri?: string;
  item: Detailed_Product_Type;
};

const Item = ({ item, base_img_uri }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
      }}
      onPress={() => {
        navigation.navigate("Recipe", { item: item });
      }}
    >
      <Image
        source={{
          uri:
            typeof base_img_uri !== "undefined"
              ? base_img_uri + item.image
              : item.image,
        }}
        style={{ height: 250, width: Dimensions.get("window").width - 30 }}
      />
      <View style={{ flex: 1, paddingVertical: 5, alignItems: "center" }}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          {item.title}
        </Text>

        <Text style={{ marginBottom: 5 }}>
          <Icon name="clock-outline" size={25} />{" "}
          {typeof item.readyInMinutes === "undefined"
            ? "?"
            : item.readyInMinutes}{" "}
          min
        </Text>
        <Text style={{ marginBottom: 5 }}>
          <Icon name="silverware-fork-knife" size={25} />{" "}
          {typeof item.servings === "undefined" ? "?" : item.servings}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
