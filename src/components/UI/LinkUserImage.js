import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const UserImage = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => alert("To user profile")}>
      <View>
        <Image />
      </View>
    </TouchableOpacity>
  );
};

export default UserImage;
