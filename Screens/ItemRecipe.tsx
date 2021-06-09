import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from "react-native";
import { Detailed_Product_Type, Ingredient_type } from "types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getRepository } from "typeorm";
import { FavoriteItem } from "../data/entities/FavoriteItem";
import { Ingredient } from "../data/entities/Ingredient";
import { API_KEY } from "../constants";

interface Props {}

const ItemRecipe = (props: Props) => {
  const route: any = useRoute();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [item, setItem] = useState<Detailed_Product_Type>();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.item.title,

      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ paddingHorizontal: 20 }}
            onPress={() => {
              isFavorite ? removeFromFavorites() : addToFavorites();
            }}
          >
            <Icon name="heart" color={isFavorite ? "red" : "grey"} size={30} />
          </TouchableOpacity>
        );
      },
    });
  }, [item, isFavorite]);

  useEffect(() => {
    checkIfFavorite();
    axios
      .get(
        `https://api.spoonacular.com/recipes/${route.params.item.id}/information?apiKey=${API_KEY}`
      )
      .then((res) => {
        setItem(res.data);
        setIsLoading(false);
      });
  }, []);

  async function checkIfFavorite() {
    const itemRepo = getRepository(FavoriteItem);
    console.log("ID: " + route.params.item.id);
    const res = await itemRepo.findOne({
      where: { item_id: route.params.item.id },
      relations: ["ingredients"],
    });

    if (typeof res !== "undefined") setIsFavorite(true);

    console.log("Db res");
    console.log(res);
  }

  async function addToFavorites() {
    const itemRepo = getRepository(FavoriteItem);
    const ingredientRepo = getRepository(Ingredient);

    const itm: FavoriteItem = {
      title: route.params.item.title,
      item_id: route.params.item.id,
      instructions: item!.instructions,
      ingredients: [],
    };

    const ingr: Array<Ingredient> = [];

    for (let i of item!.extendedIngredients) {
      ingr.push({
        id_ingredient: i.id,
        name: i.name,
        amount: parseFloat(i.measures.metric.amount),
        unit: i.measures.metric.unitShort,
      });

      await ingredientRepo.save({
        id_ingredient: i.id,
        name: i.name,
        amount: parseFloat(i.measures.metric.amount),
        unit: i.measures.metric.unitShort,
      });
    }
    itm.ingredients = ingr;
    console.log(itm);

    await itemRepo.save(itm);
    setIsFavorite(true);

    if (Platform.OS === "android") {
      ToastAndroid.show("Added to favorites", ToastAndroid.SHORT);
    }
  }

  async function removeFromFavorites() {
    try {
      const itemRepo = getRepository(FavoriteItem);

      await itemRepo.delete({ item_id: route.params.item.id });

      setIsFavorite(false);

      if (Platform.OS === "android") {
        ToastAndroid.show("Removed from favorites", ToastAndroid.SHORT);
      }
    } catch (err) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    }
  }
  return isLoading ? (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color="black" size="large" />
    </View>
  ) : (
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
        {item?.extendedIngredients.map(
          (ingredient: Ingredient_type, index: number) => {
            return (
              <Text key={index} style={{ marginBottom: 5 }}>
                {ingredient.name} - {ingredient.measures.metric.amount}{" "}
                {ingredient.measures.metric.unitShort}
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
        <Text>{item?.instructions.replace(/<[^>]*>?/gm, "")}</Text>
      </View>
    </ScrollView>
  );
};

export default ItemRecipe;
