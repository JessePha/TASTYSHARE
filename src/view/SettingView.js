import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CustomBar from "../components/UI/CustomBar";
import { auth } from "../../config/config";

const SettingView = ({ navigation }) => {
  const onSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Home", { screen: "Main" });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          <CustomBar
            text="Username"
            textColor="black"
            userIconHeight={70}
            userIconWidth={70}
            bgColor="white"
            height={2}
            iconBgColor="darkgray"
            image={<AntDesign name="user" size={40} color="white" />}
          />
        </View>
        <View style={styles.infoContainer}>
          <CustomBar
            text="Likes"
            textColor="black"
            bgColor="white"
            iconBgColor="lightgreen"
            userIconHeight={40}
            userIconWidth={40}
            icon={
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            }
            image={
              <AntDesign
                name="like2"
                size={20}
                color="white"
                onPress={() => console.log("go to Likes")}
              />
            }
          />
          <CustomBar
            text="Saved"
            textColor="black"
            bgColor="white"
            iconBgColor="lightblue"
            userIconHeight={40}
            userIconWidth={40}
            icon={
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            }
            image={
              <AntDesign
                name="save"
                size={20}
                color="white"
                onPress={() => console.log("go to save")}
              />
            }
          />
        </View>
        <View style={styles.logoutContainer}>
          <CustomBar
            text="Log out"
            textColor="black"
            bgColor="white"
            iconBgColor="tomato"
            userIconHeight={40}
            userIconWidth={40}
            image={
              <AntDesign
                name="logout"
                size={20}
                color="white"
                onPress={() => onSignOut()}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  topContainer: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
  },
  infoContainer: {
    flex: 2,
    justifyContent: "center",
  },
  logoutContainer: {
    flex: 3,
    justifyContent: "flex-start",
  },
});

export default SettingView;
