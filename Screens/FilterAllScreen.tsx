import FilterMenu from "../Components/FilterMenu";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

import ingredients_json from "../ingredients.json";

import IngredientsList from "../Components/IngredientsList";
import FloatingButton from "../Components/FloatingButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { Detailed_Product_Type } from "types";
import { ScrollView } from "react-native-gesture-handler";
import Item from "../Components/Item";
import { API_KEY } from "../constants";
import { useNavigation } from "@react-navigation/native";

interface Props {}

const FilterAllScreen = (props: Props) => {
  const navigation = useNavigation();

  const [active, setActive] = useState<string>("ingredients");
  const [ingredients, setingredients] = useState<Array<string>>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useState<boolean>(false);

  const [filteredIngredients, setfilteredIngredients] = useState<Array<string>>(
    []
  );
  const [selectedIngredients, setselectedIngredients] = useState<Array<string>>(
    []
  );

  const [veganRecipes, setVeganRecipes] = useState<
    Array<Detailed_Product_Type>
  >([]);

  const [vegeterianRecipes, setVegeterianRecipes] = useState<
    Array<Detailed_Product_Type>
  >([]);

  const [isFetchingByIngredients, setisFetchingByIngredients] =
    useState<boolean>(false);

  useEffect(() => {
    ingredients_json.slice(0, 60).map((ingr) => {
      ingr.ingredients.map((name) => {
        setingredients((previous) => {
          return [...new Set([...previous, name])];
        });

        setfilteredIngredients((previous) => {
          return [...new Set([...previous, name])];
        });
      });
    });
  }, []);

  useEffect(() => {
    if (active === "vegeterian") getVegeterian();
    if (active === "vegan") getVegan();
  }, [active]);

  const getVegan = async () => {
    setisLoading(true);
    console.log("VEGAN");
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=vegan&number=10`
    );

    //console.log(res.data.recipes);
    setVeganRecipes(res.data.recipes);
    setisLoading(false);
  };

  const getVegeterian = async () => {
    console.log("VEGETERIAN");
    setisLoading(true);
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=vegetarian`
    );
    setVegeterianRecipes(res.data.recipes);
    setisLoading(false);
  };

  const getByIngredient = async () => {
    setisFetchingByIngredients(true);
    const ingredientString = selectedIngredients
      .toString()
      .replace(/\s/g, "%20");

    if (ingredientString === "") {
      Alert.alert("Error", "Select some ingredients");
      setisFetchingByIngredients(false);
      return;
    }

    const res = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredientString}&number=10`
    );

    setisFetchingByIngredients(false);
    navigation.navigate("By_ingredients", { item: res.data });
  };

  return (
    <View style={{ flex: 1, flexGrow: 1 }}>
      <FilterMenu active={active} setActive={setActive} />
      {active === "ingredients" ? (
        <View style={{ flex: 1 }}>
          <IngredientsList
            ingredients={ingredients}
            filteredIngredients={filteredIngredients}
            setfilteredIngredients={setfilteredIngredients}
            selectedIngredients={selectedIngredients}
            setselectedIngredients={setselectedIngredients}
          />

          <FloatingButton
            Icon={
              isFetchingByIngredients ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Icon name="search" size={35} color="white" />
              )
            }
            onPress={getByIngredient}
          />
        </View>
      ) : null}

      {active === "vegan" ? (
        isLoading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator color="black" size={25} />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 30,
              paddingHorizontal: 5,
            }}
          >
            {veganRecipes.map((item, index) => {
              console.log(veganRecipes.length);
              return <Item item={item} key={index} />;
            })}
          </ScrollView>
        )
      ) : null}

      {active === "vegeterian" ? (
        isLoading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator color="black" size={25} />
          </View>
        ) : (
          <View style={{ flex: 1, flexGrow: 1 }}>
            <ScrollView>
              {vegeterianRecipes.map((item, index) => {
                return <Item item={item} key={index} />;
              })}
            </ScrollView>
          </View>
        )
      ) : null}
    </View>
  );
};

export default FilterAllScreen;
