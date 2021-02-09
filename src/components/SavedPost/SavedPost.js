import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import moment from "moment";
import { useTheme } from "@react-navigation/native";

const SavedPost = ({ item, navigation }) => {
  const { colors } = useTheme();
  const miliseconds =
    item.createAt.seconds * 1000 + item.createAt.nanoseconds / 1000000;
  const date = new Date(miliseconds);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Home", {
          screen: "foodView",
          params: { item },
        })
      }
    >
      <View
        style={{
          ...styles.ImageContainer,
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        <Image source={{ uri: item.imageuri }} style={styles.Image} />
        <View style={{ width: 200 }}>
          {item.title !== "" ? (
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {item.title}
            </Text>
          ) : (
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              No Title
            </Text>
          )}
          {item.price ? (
            <Text style={{ color: colors.text }}>{item.price}</Text>
          ) : null}
          {item.description !== "" ? (
            <Text
              numberOfLines={4}
              style={{ color: colors.text, marginBottom: 5 }}
            >
              {item.description}
            </Text>
          ) : (
            <Text style={{ color: colors.text, marginBottom: 5 }}>
              No description
            </Text>
          )}
          <Text style={{ color: colors.text }}>
            {item.createAt && moment(date.toISOString()).calendar()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    marginBottom: 10,
  },
  Image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
});

export default SavedPost;
