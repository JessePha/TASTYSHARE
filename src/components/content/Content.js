import React from "react";
import { View, Text, TextInput } from "react-native";

const Content = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Whats up</Text>
      <TextInput style={{ width: 100, borderBottomWidth: 0.5 }} />
    </View>
  );
};

export default Content;
