import React from "react";
import Post from "./post/Post";
import { View, FlatList, Dimensions } from "react-native";

const UserPosts = () => {
  const WIDTH = Dimensions.get("window").width;
  const numColumns = 2
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Forth Item",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Forth Item",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        renderItem={() => <Post WIDTH = {WIDTH} numColumn = {numColumns}  />}
        key={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
  );
};

export default UserPosts;
