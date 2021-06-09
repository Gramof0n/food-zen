import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  item_id?: number;
  item_title: string;
  destination_to_navigate: string;
  params_for_navigation: {};
}

const ListItemView = ({
  destination_to_navigate,
  params_for_navigation,
  item_id,
  item_title,
}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 10 }}>
      <Text
        style={styles.itemStyle}
        onPress={() => {
          navigation.navigate(destination_to_navigate, params_for_navigation);
        }}
      >
        {item_id ? `${item_id}.` : null}
        {item_title.toUpperCase()}
      </Text>
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

export default ListItemView;
