import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import {
  filterByDateAsc,
  filterByPopularityAsc,
  filterByCategoryDsc,
  filterByLocationDsc,
} from "../../handleFilter/handleFilter";
import { useTheme } from "@react-navigation/native";

const bottomSheet = ({ bs, fall, posts, setFilteredData }) => {
  const { colors } = useTheme();
  const header = () => (
    <View style={styles.header}>
      <View style={styles.padnelHeader}>
        <Text>Filter by</Text>
      </View>
    </View>
  );

  const content = () => (
    <View style={{ ...styles.content, backgroundColor: colors.background }}>
      <TouchableOpacity
        onPress={() => {
          setFilteredData(filterByDateAsc(posts)), bs.current.snapTo(1);
        }}
      >
        <Text style={{ color: colors.text }}>Date</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilteredData(filterByPopularityAsc(posts)), bs.current.snapTo(1);
        }}
      >
        <Text style={{ color: colors.text }}>Popularity</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilteredData(filterByCategoryDsc(posts)), bs.current.snapTo(1);
        }}
      >
        <Text style={{ color: colors.text }}>Category</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilteredData(filterByLocationDsc(posts)), bs.current.snapTo(1);
        }}
      >
        <Text style={{ color: colors.text }}>Location</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={[150, 0]}
        renderHeader={header}
        renderContent={content}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  padnelHeader: {
    alignItems: "center",
    justifyContent: "center",
  },
  panelHandle: {
    width: 30,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  content: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    height: 130,
  },
});

export default bottomSheet;
