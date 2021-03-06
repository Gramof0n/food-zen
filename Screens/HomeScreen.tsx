import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MAIN_COLOR } from "../constants";

type Props = any & {};

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logo}>
        <Image source={require("../assets/LOGO.png")} />
        <Text style={styles.mainText}>FoodZen</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Search")}
            style={styles.buttons}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              props.navigation.navigate("Filter");
            }}
          >
            <Text style={styles.buttonText}>FilterAll</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              props.navigation.navigate("Favorites");
            }}
          >
            <Image
              style={styles.resizeIcon}
              source={require("../assets/heart.png")}
            />
            <Text style={styles.buttonText}>Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    //alignItems: 'center',
    //justifyContent: 'center',
    flex: 0.8,
    //backgroundColor: 'red'
  },
  buttons: {
    height: 40,
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 18,
    backgroundColor: MAIN_COLOR,
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

export default HomeScreen;
