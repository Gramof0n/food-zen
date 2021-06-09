import { useRoute } from "@react-navigation/native";
import Item from "../Components/Item";
import React from "react";
import { View, ScrollView } from "react-native";

interface Props {}

const ItemsByIngredientScreen = (props: Props) => {
  const route: any = useRoute();

  return (
    <View>
      {route.params.item.map((item: any, index: number) => {
        return (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 5 }}
          >
            {route.params.item.map((item: any, index: number) => {
              return <Item key={index} item={item} />;
            })}
          </ScrollView>
        );
      })}
    </View>
  );
};

export default ItemsByIngredientScreen;
