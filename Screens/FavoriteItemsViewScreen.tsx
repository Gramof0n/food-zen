import { FavoriteItem } from "../data/entities/FavoriteItem";
import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { getRepository } from "typeorm";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ListItemSeparator from "../Components/ListItemSeparator";
import ListItemView from "../Components/ListItemView";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SearchBar } from "react-native-elements/dist/searchbar/SearchBar";

interface Props {}

const FavoriteItemsViewScreen = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setitems] = useState<Array<FavoriteItem>>();

  const [filteredItems, setFilteredItems] = useState<Array<FavoriteItem>>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => navigation.navigate("Add")}
          >
            <Icon name="plus" size={35} color="red" />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
      filter(searchTerm);
    }, [])
  );

  async function getFavorites() {
    const itemRepo = getRepository(FavoriteItem);

    const items = await itemRepo.find({ relations: ["ingredients"] });

    setitems(items);
    setFilteredItems(items);
    setIsLoading(false);
  }

  function filter(searchTerm: string) {
    if (searchTerm === "") {
      setFilteredItems(items);
      setSearchTerm("");
      return;
    }

    const filtered = items?.filter((item: FavoriteItem) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredItems(filtered);
    setSearchTerm(searchTerm);
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
    <View>
      <View style={{ backgroundColor: "white" }}>
        <SearchBar
          platform="default"
          onChangeText={(text) => {
            filter(text);
          }}
          placeholder="Search favorites..."
          value={searchTerm}
          containerStyle={{
            justifyContent: "space-around",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            paddingBottom: 2,
            height: 50,
            width: Dimensions.get("screen").width,
          }}
        />
      </View>
      <FlatList
        data={filteredItems}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }: any) => (
          <ListItemView
            params_for_navigation={{ item: item }}
            item_title={item.title}
            destination_to_navigate="Favorite_recipes"
          />
        )}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  );
};

export default FavoriteItemsViewScreen;
