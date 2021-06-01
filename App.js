import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./Screens/SearchScreen";

export default function App() {
  const Stack = createStackNavigator();
  console.log("adfsadfafedgvszedgv");
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "normal",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 0.8,
  },
  buttons: {
    height: 40,
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 18,
    backgroundColor: "#F85F6A",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "normal",
    fontWeight: "bold",
  },
  resizeIcon: {
    marginLeft: -20,
    marginRight: 10,
    width: 30,
    height: 30,
  },
});
