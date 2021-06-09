import "reflect-metadata";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./Screens/SearchScreen";
import FoodItemScreen from "./Screens/FoodItemScreen";
import ItemRecipe from "./Screens/ItemRecipe";
import { createConnection } from "typeorm";
import { FavoriteItem } from "./data/entities/FavoriteItem";
import { Ingredient } from "./data/entities/Ingredient";
import FavoriteItemsViewScreen from "./Screens/FavoriteItemsViewScreen";
import FavoriteItemRecipe from "./Screens/FavoriteItemRecipe";
import FilterAllScreen from "./Screens/FilterAllScreen";
import AddRecipeScreen from "./Screens/AddRecipeScreen";
import ItemsByIngredientScreen from "./Screens/ItemsByIngredientScreen";

export default function App() {
  const Stack = createStackNavigator();
  console.log("adfsadfafedgvszedgv");

  const connection = async () => {
    await createConnection({
      type: "expo",
      driver: require("expo-sqlite"),
      database: "favorites",
      entities: [FavoriteItem, Ingredient],
      synchronize: true,
    });

    console.log("Konekcija uspostavljena");
  };

  connection();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: true, title: "" }}
        />

        <Stack.Screen
          name="Item"
          component={FoodItemScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Recipe"
          component={ItemRecipe}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Favorites"
          component={FavoriteItemsViewScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Favorite_recipes"
          component={FavoriteItemRecipe}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Filter"
          component={FilterAllScreen}
          options={{ headerShown: true, title: "Filter by" }}
        />

        <Stack.Screen
          name="Add"
          component={AddRecipeScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="By_ingredients"
          component={ItemsByIngredientScreen}
          options={{ headerShown: true, title: "Items by ingredient" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
