import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import axios, { Canceler } from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { HeaderBackButton } from "@react-navigation/stack";
import { SearchBar } from "react-native-elements/dist/searchbar/SearchBar";
import Item from "../Components/Item";
import { API_KEY } from "../constants";

interface Props {}

type Item_type = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
};

const FoodItemScreen = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>();
  const [items, setItems] = useState<Array<Item_type>>([]);
  const [filteredItems, setFilteredItems] = useState<Array<Item_type>>();

  const searchBarRef = useRef<any>(null);

  const baseImgUrl = "https://spoonacular.com/recipeImages/";

  useFocusEffect(
    useCallback(() => {
      console.log("CALLBACK");
      navigation.setOptions({
        title: isSearchClicked ? null : route.params?.category,
        headerRight: () => {
          if (!isSearchClicked) {
            return (
              <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsSearchClicked(true);
                  }}
                >
                  <Icon name="search" color="black" size={25} />
                </TouchableOpacity>
              </View>
            );
          } else {
            return null;
          }
        },

        headerLeft: () => {
          if (isSearchClicked) {
            searchBarRef.current !== null
              ? searchBarRef!.current!.focus()
              : null;

            return (
              <SearchBar
                ref={searchBarRef}
                platform="android"
                onCancel={() => {
                  setIsSearchClicked(false);
                }}
                onChangeText={(text) => {
                  console.log(text);
                  //setSearchTerm(text);
                  filter(text);
                }}
                onSubmitEditing={() => {
                  setIsSearchClicked(false);
                }}
                value={searchTerm}
                containerStyle={{
                  backgroundColor: "white",
                  justifyContent: "space-around",
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  paddingBottom: 2,
                  width: Dimensions.get("screen").width,
                }}
                searchIcon={{ size: 24, backgroundColor: "white" }}
                inputContainerStyle={{ backgroundColor: "white" }}
                leftIconContainerStyle={{ backgroundColor: "white" }}
                inputStyle={{ backgroundColor: "white" }}
              />
            );
          } else {
            return <HeaderBackButton onPress={() => navigation.goBack()} />;
          }
        },
      });
    }, [isSearchClicked, searchTerm])
  );

  const filter = (searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredItems(items);
      setSearchTerm(searchTerm);
      return;
    }

    const filtered = items.filter((item: Item_type) => {
      const itemTitle = item.title.toLocaleLowerCase();
      const searchTermLowerCase = searchTerm.toLocaleLowerCase();
      console.log("Item title iz filtera: " + itemTitle);

      return itemTitle.indexOf(searchTermLowerCase) > -1;
    });

    setFilteredItems(filtered);
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    setIsLoading(true);
    let cancel: Canceler;
    axios
      .get(
        `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${
          route.params.category
        }&number=20&diet=${
          typeof route.params.diet === "undefined" ? "" : route.params.diet
        }`,
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        console.log(res.data);
        setItems(res.data.results);
        setFilteredItems(res.data.results);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

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
      contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 5 }}
    >
      {filteredItems!.map((item: any, index: number) => {
        return <Item key={index} item={item} base_img_uri={baseImgUrl} />;
      })}
    </ScrollView>
  );
};

export default FoodItemScreen;
