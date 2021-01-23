import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";

const bottomSheet = ({ navigation, bs, fall }) => {
  const header = () => (
    <View style={styles.header}>
      <View style={styles.padnelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const content = () => (
    <View style={styles.content}>
      <Text>Join TastyShare!</Text>
      <Text>Sign up to like and share your content</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Log in")}>
        <Text>Already have account ?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
        <Text>Mabe later</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={[250, 0]}
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
    paddingTop: 20,
  },
  padnelHeader: {
    alignItems: "center",
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
    padding: 20,
    height: 250,
  },
});

export default bottomSheet;
