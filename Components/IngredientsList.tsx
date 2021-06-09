import { MAIN_COLOR } from "../constants";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements/dist/searchbar/SearchBar";

interface Props {
  selectedIngredients: Array<string>;
  ingredients: Array<string>;
  filteredIngredients: Array<string>;

  setfilteredIngredients: Function;
  setselectedIngredients: Function;
}

const IngredientsList = ({
  selectedIngredients,
  setfilteredIngredients,
  ingredients,
  filteredIngredients,
  setselectedIngredients,
}: Props) => {
  const [searchTerm, setsearchTerm] = useState<string>("");

  return (
    <View>
      <SearchBar
        onChangeText={(text) => {
          setsearchTerm(text);

          const filtered = ingredients.filter((ingr) => {
            return ingr.toLowerCase().includes(text.toLowerCase());
          });
          setfilteredIngredients(filtered);

          if (text === "") {
            setsearchTerm("");
            setfilteredIngredients(ingredients);
          }
        }}
        onCancel={() => {
          setfilteredIngredients(ingredients);
          setsearchTerm("");
        }}
        value={searchTerm}
        platform="default"
        placeholder="Search for ingredients"
        containerStyle={{
          justifyContent: "space-around",
          borderTopWidth: 0,
          borderBottomWidth: 0,
          paddingBottom: 2,
          height: 50,
          width: Dimensions.get("screen").width,
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 15, paddingBottom: 120 }}>
        {filteredIngredients.map((name, index) => {
          return (
            <View key={index} style={{ marginBottom: 7 }}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>{name}</Text>
                <Checkbox
                  value={selectedIngredients.includes(name)}
                  color={MAIN_COLOR}
                  onValueChange={() => {
                    if (!selectedIngredients.includes(name)) {
                      setselectedIngredients((prev: Array<string>) => [
                        ...prev,
                        name,
                      ]);
                    } else {
                      setselectedIngredients((previous: Array<string>) =>
                        previous.filter((prevIngr) => prevIngr !== name)
                      );
                    }
                  }}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default IngredientsList;
