import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  active: string;
  setActive: Function;
}

const FilterMenu = ({ active, setActive }: Props) => {
  return (
    <View
      style={{
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingTop: 25,
        flexDirection: "row",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity onPress={() => setActive("vegan")}>
        <Text style={{ color: active === "vegan" ? "black" : "grey" }}>
          Vegan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActive("vegeterian")}>
        <Text style={{ color: active === "vegeterian" ? "black" : "grey" }}>
          Vegeterian
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActive("ingredients")}>
        <Text style={{ color: active === "ingredients" ? "black" : "grey" }}>
          Ingredients
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterMenu;
