import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Platform, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getRepository } from "typeorm";
import { FavoriteItem } from "../data/entities/FavoriteItem";

interface Props {}

const FavoriteItemRecipe = (props: Props) => {
  const route: any = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.item.title,

      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ paddingHorizontal: 20 }}
            onPress={() => {
              removeFromFavorites();
            }}
          >
            <Icon name="heart" color="red" size={30} />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  async function removeFromFavorites() {
    try {
      const itemRepo = getRepository(FavoriteItem);

      console.log(route.params.item);
      await itemRepo.delete({ id_favorite: route.params.item.id_favorite });

      if (Platform.OS === "android") {
        ToastAndroid.show("Removed from favorites", ToastAndroid.SHORT);
        navigation.goBack();
      }
    } catch (err) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 30,
        paddingTop: 15,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          marginBottom: 20,
          textDecorationLine: "underline",
        }}
      >
        Ingredients:{" "}
      </Text>

      <View style={{ borderColor: "black", borderWidth: 1, padding: 10 }}>
        {route.params.item?.ingredients.map(
          (ingredient: any, index: number) => {
            return (
              <Text key={index} style={{ marginBottom: 5 }}>
                {ingredient.name} - {ingredient.amount} {ingredient.unit}
              </Text>
            );
          }
        )}
      </View>

      <Text
        style={{
          fontSize: 22,
          marginBottom: 20,
          marginTop: 20,
          textDecorationLine: "underline",
        }}
      >
        Preparation:
      </Text>
      <View style={{ borderColor: "black", borderWidth: 1, padding: 10 }}>
        <Text>{route.params.item?.instructions}</Text>
      </View>
    </ScrollView>
  );
};

export default FavoriteItemRecipe;
