import React from "react";
import Post from "./Post/Post";
import { View, FlatList } from "react-native";

const Posts = ({navigation}) => {
  const buttonTexts = ["Like", "Share"];
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
  ];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        renderItem={() => <Post texts={buttonTexts} navigation = {navigation} />}
        key={(item) => item.id}
      />
    </View>
  );
};

export default Posts;
