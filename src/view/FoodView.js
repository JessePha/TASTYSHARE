import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Post from "../components/Posts/Post/Post";
import MapView from "react-native-maps";
const FoodView = ({ route, navigation }) => {
  const { item } = route.params;
  const buttonTexts = ["Like", "Share"];

  return (
    <View style={{ flex: 1, backgroundColor: "#5A595B" }}>
      <View style={{ flex: 1 }}>
        <Post item={item} texts={buttonTexts} navigation={navigation} />
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
  },
});

export default FoodView;
