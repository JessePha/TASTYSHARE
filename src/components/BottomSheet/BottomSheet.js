import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { appColors } from "../../shared/global/colors/colors";

const bottomSheet = ({ navigation, bs, fall }) => {
  const { colors } = useTheme();
  const header = () => (
    <View style={styles.header}>
      <View style={styles.padnelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const content = () => (
    <View style={styles.content}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.text, fontSize: 20, paddingRight: 10 }}>
            Join
          </Text>
          <Text style={{ color: appColors.logo, fontSize: 22 }}>
            TASTYSHARE
          </Text>
          <Text style={{ fontSize: 20, color: colors.text }}> !</Text>
        </View>
        <Text style={{ color: colors.text }}>
          Sign up to like and share your content
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: colors.text }}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Log in")}>
          <Text style={{ color: colors.text }}>Already have account ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
          <Text style={{ color: colors.text }}>Mabe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={[300, 0]}
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
    backgroundColor: appColors.bottomSheetHeaderBgColor,
    shadowColor: appColors.shadowColor,
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
    backgroundColor: appColors.panelHandle,
    marginBottom: 10,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: appColors.bottomSheetContent,
    height: 270,
  },
});

export default bottomSheet;
