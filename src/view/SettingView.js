import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Switch, Drawer, TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CustomBar from "../components/UI/CustomBar";
import { auth } from "../../config/config";
import { connect } from "react-redux";
import * as actionTypes from "../shared/global/globalstates/actions/actionTypes";

const SettingView = ({
  navigation,
  currentUser,
  currentTheme,
  changeTheme,
}) => {
  const { colors } = useTheme();

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
            text={`${currentUser.firstName} ${currentUser.lastName}`}
            textColor={colors.text}
            userIconHeight={85}
            userIconWidth={85}
            bgColor={colors.background}
            height={2}
            iconBgColor={colors.iconBackgroundColor}
            image={
              currentUser.imageuri ? (
                <Image
                  source={{ uri: currentUser.imageuri }}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              ) : (
                <AntDesign name="user" size={40} color={colors.iconColor} />
              )
            }
          />
        </View>
        <Drawer.Section></Drawer.Section>
        <View style={styles.infoContainer}>
          <Drawer.Section>
            <CustomBar
              text="Likes"
              textColor={colors.text}
              bgColor={colors.background}
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
          </Drawer.Section>
          <Drawer.Section>
            <TouchableOpacity
              onPress={() => navigation.navigate("userpost", {})}
            >
              <CustomBar
                text="Posts"
                textColor={colors.text}
                bgColor={colors.background}
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
                image={<AntDesign name="save" size={20} color="white" />}
              />
            </TouchableOpacity>
          </Drawer.Section>
          <Drawer.Section>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("usersetting", { currentUser })
              }
            >
              <CustomBar
                text="Setting"
                textColor={colors.text}
                bgColor={colors.background}
                iconBgColor="#ff7b54"
                userIconHeight={40}
                userIconWidth={40}
                icon={
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                }
                image={<AntDesign name="setting" size={20} color="white" />}
              />
            </TouchableOpacity>
          </Drawer.Section>
        </View>
        <View style={styles.logoutContainer}>
          <CustomBar
            text="Log out"
            textColor={colors.text}
            bgColor={colors.background}
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
          <Drawer.Section title="preference">
            <TouchableRipple onPress={() => changeTheme(!currentTheme)}>
              <View style={styles.preference}>
                <Text style={{ color: colors.text }}>Theme</Text>
                <View pointerEvents="none">
                  <Switch color="#00e0ff" value={currentTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
  },
  infoContainer: {
    flex: 3,
    justifyContent: "center",
  },
  logoutContainer: {
    flex: 3,
    justifyContent: "flex-start",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    currentTheme: state.auth.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: (theme) =>
      dispatch({ type: actionTypes.CHANGE_THEME, payload: theme }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingView);
