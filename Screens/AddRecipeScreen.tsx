import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { Ingredient } from "../data/entities/Ingredient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Button } from "react-native-elements/dist/buttons/Button";
import { FavoriteItem } from "../data/entities/FavoriteItem";
import { getRepository } from "typeorm";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FloatingButton from "../Components/FloatingButton";

interface Props {}

const AddRecipeScreen = (props: Props) => {
  const navigation = useNavigation();

  const [recipeNameInput, setRecipeNameInput] = useState<string>("");
  const [instructionsInput, setInstructionsInput] = useState<string>("");

  const [ingrName, setIngrName] = useState("");
  const [ingrAmount, setIngrAmount] = useState(0);
  const [ingrUnit, setIngrUnit] = useState("");

  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [instructions, setInstructions] = useState<string>("");

  const [isIngredientModalVisible, setIsIngredientModalVisible] =
    useState<boolean>(false);
  const [isInstructionsModalVisible, setIsInstructionsModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => {
        return (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <HeaderBackButton onPress={() => navigation.goBack()} />
            <TextInput
              style={{ fontSize: 18 }}
              placeholder="Enter the name of your new recipe"
              onChangeText={(text) => {
                setRecipeNameInput(text);
              }}
            />
          </View>
        );
      },
    });
  }, []);

  async function submitRecipe() {
    try {
      const ingredientRepo = getRepository(Ingredient);
      const itemRepo = getRepository(FavoriteItem);

      if (recipeNameInput === "") {
        Alert.alert("Error", "Your recipe must be named!");
        return;
      }

      if (ingredients.length === 0) {
        Alert.alert("Error", "Add at least one ingredient!");
        return;
      }

      if (instructions === "") {
        Alert.alert("Error", "You should type some instructions.");
        return;
      }

      for (let i of ingredients) {
        await ingredientRepo.save({
          name: i.name,
          amount: i.amount,
          unit: i.unit,
        });
      }

      const Item: FavoriteItem = {
        title: recipeNameInput,
        instructions: instructions,
        ingredients: ingredients,
      };

      await itemRepo.save(Item);

      console.log(Item);
      navigation.goBack();
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
        position: "relative",
        flexGrow: 1,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 22,
            marginBottom: 20,
            textDecorationLine: "underline",
          }}
        >
          Ingredients:{" "}
        </Text>

        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            setIngrName("");
            setIngrAmount(0);
            setIngrUnit("");
            setIsIngredientModalVisible(true);
          }}
        >
          <Icon name="plus" color="red" size={30} />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isIngredientModalVisible}
        onBackButtonPress={() => setIsIngredientModalVisible(false)}
        onBackdropPress={() => setIsIngredientModalVisible(false)}
        useNativeDriverForBackdrop
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <Text style={{ alignSelf: "center", fontSize: 18, marginBottom: 10 }}>
            Add an ingredient
          </Text>
          <Text style={{ marginTop: 10 }}>Name:</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 1, padding: 2 }}
            onChangeText={(text) => {
              setIngrName(text);
            }}
          />
          <Text style={{ marginTop: 10 }}>Amount:</Text>
          <TextInput
            keyboardType="numeric"
            style={{ borderColor: "black", borderWidth: 1, padding: 2 }}
            onChangeText={(text) => {
              setIngrAmount(parseFloat(text));
            }}
          />
          <Text style={{ marginTop: 10 }}>Unit:</Text>
          <TextInput
            style={{ borderColor: "black", borderWidth: 1, padding: 2 }}
            onChangeText={(text) => {
              setIngrUnit(text);
            }}
          />
          <Button
            containerStyle={{
              backgroundColor: "black",
              width: 150,
              alignSelf: "center",
              marginTop: 30,
            }}
            onPress={() => {
              const ingr: Ingredient = {
                name: ingrName,
                amount: ingrAmount,
                unit: ingrUnit,
              };

              if (ingr.name === "" || ingr.amount === 0 || ingr.unit === "") {
                Alert.alert("Error", "No empty values allowed.");
                return;
              }

              console.log(ingr);

              setIngredients((previousIngr) => [...previousIngr, ingr]);
              setIsIngredientModalVisible(false);
            }}
            title="Add ingredient"
          />
        </View>
      </Modal>

      {ingredients.length === 0 ? null : (
        <View
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
            marginBottom: 25,
          }}
        >
          {ingredients.map((ingredient, index) => {
            return (
              <View key={index} style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 5 }}>
                  {ingredient.name} - {ingredient.amount} {ingredient.unit}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 22,
            marginBottom: 20,
            textDecorationLine: "underline",
          }}
        >
          Preparation:
        </Text>

        <TouchableOpacity
          onPress={() => {
            setIsInstructionsModalVisible(true);
            setInstructionsInput(instructions);
          }}
          style={{ marginLeft: 10 }}
        >
          <Icon name="plus" color="red" size={30} />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isInstructionsModalVisible}
        onBackButtonPress={() => setIsInstructionsModalVisible(false)}
        onBackdropPress={() => setIsInstructionsModalVisible(false)}
        useNativeDriverForBackdrop
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <Text style={{ alignSelf: "center", fontSize: 18, marginBottom: 10 }}>
            Type out instructions
          </Text>
          <TextInput
            style={{
              borderColor: "black",
              borderWidth: 1,
              padding: 2,
              height: 200,
            }}
            textAlign="left"
            textAlignVertical="top"
            multiline
            value={instructionsInput}
            onChangeText={(text) => {
              setInstructionsInput(text);
            }}
            autoCorrect={false}
          />
          <Button
            containerStyle={{
              backgroundColor: "black",
              width: 150,
              alignSelf: "center",
              marginTop: 30,
            }}
            onPress={() => {
              setInstructions(instructionsInput);
              setIsInstructionsModalVisible(false);
            }}
            title="Add instructions"
          />
        </View>
      </Modal>

      {instructions === "" ? null : (
        <View style={{ borderColor: "black", borderWidth: 1, padding: 10 }}>
          <Text>{instructions}</Text>
        </View>
      )}

      <FloatingButton
        Icon={<Icon name="plus" color="white" size={50} />}
        onPress={submitRecipe}
      />
    </ScrollView>
  );
};

export default AddRecipeScreen;
