import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { SearchBar } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ListItemSeparator from "../Components/ListItemSeparator";
import ListItemView from "../Components/ListItemView";
import { Category } from "../types";

type Props = {};

const SearchScreen = (props: Props) => {
  const categories = [
    { id: 1, title: "Pizza" },
    { id: 2, title: "Pasta" },
    { id: 3, title: "Burgers" },
    { id: 4, title: "Tacos" },
    { id: 5, title: "Fish" },
    { id: 6, title: "Pork" },
    { id: 7, title: "Beef" },
    { id: 8, title: "Chicken" },
    { id: 9, title: "Eggs" },
    { id: 10, title: "Soups" },
    { id: 11, title: "Salads" },
    { id: 12, title: "Sandwiches" },
    { id: 13, title: "Wraps" },
  ];
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] =
    useState<Array<Category>>(categories);
  const [masterDataSource, _] = useState<Array<Category>>(categories);

  const navigation = useNavigation();

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: () => {
          return (
            <View>
              <SearchBar
                platform="android"
                searchIcon={{ size: 24, backgroundColor: "white" }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={() => {
                  searchFilterFunction("");
                }}
                placeholder="Type Here..."
                value={search}
                inputContainerStyle={{ backgroundColor: "white" }}
                leftIconContainerStyle={{ backgroundColor: "white" }}
                inputStyle={{ backgroundColor: "white" }}
                containerStyle={{
                  justifyContent: "space-around",
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  paddingBottom: 2,
                  height: 50,
                  width: Dimensions.get("screen").width,
                }}
                focusable={true}
              />
            </View>
          );
        },
      });
    }, [search])
  );

  return (
    <View style={styles.searchBar}>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }: any) => (
          <ListItemView
            params_for_navigation={{ category: item.title }}
            item_id={item.id}
            item_title={item.title}
            destination_to_navigate="Item"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
    fontSize: 15,
  },
  searchBar: {
    flex: 1,
    //marginTop: 30,
  },
});

export default SearchScreen;
