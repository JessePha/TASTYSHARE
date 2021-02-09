import React from "react";
import { View, Text, FlatList } from "react-native";
import Post from "../components/Posts/Post/Post";
import { useTheme } from "@react-navigation/native";

const SearchView = ({ route, navigation }) => {
  const { data, authenticated } = route.params;
  const { colors } = useTheme();
  return data.length > 0 ? (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.postID}
        renderItem={({ item }) => (
          <Post
            item={item}
            navigation={navigation}
            authenticated={authenticated}
          />
        )}
      />
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.text }}>Not found</Text>
    </View>
  );
};

export default SearchView;
