import React from "react";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

const Post = ({ item, navigation, authenticated }) => {
  const { colors } = useTheme();
  const miliseconds =
    item.createAt.seconds * 1000 + item.createAt.nanoseconds / 1000000;
  const date = new Date(miliseconds);
  const onNavigate = (item) => {
    if (authenticated.currentUser) {
      item.user === authenticated.currentUser.uid
        ? navigation.navigate("tab", {
            screen: "Profile",
            params: { item },
          })
        : navigation.navigate("userProfile", { item });
    } else {
      navigation.navigate("userProfile", { item });
    }
  };

  return (
    <View style={styles.container}>
      <Drawer.Section>
        <TouchableOpacity
          onPress={() => navigation.navigate("foodView", { item })}
        >
          <View style={styles.ImageContainer}>
            <Image source={{ uri: item.imageuri }} style={styles.Image} />
          </View>
        </TouchableOpacity>
      </Drawer.Section>
      <Drawer.Section>
        <View
          style={{
            ...styles.UserLinkAndShareContainer,
            backgroundColor: colors.background,
          }}
        >
          <View style={styles.UserInfoContainer}>
            <TouchableOpacity onPress={() => onNavigate(item)}>
              {item.userInfo.imageuri ? (
                <Image
                  source={{ uri: item.userInfo.imageuri }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
              ) : (
                <View
                  style={{
                    ...styles.userImage,
                    backgroundColor: colors.iconBackgroundColor,
                  }}
                >
                  <AntDesign name="user" size={20} color={colors.iconColor} />
                </View>
              )}
            </TouchableOpacity>
            <Text
              style={{ ...styles.userName, color: colors.text }}
            >{`${item.userInfo.firstName} ${item.userInfo.lastName}`}</Text>
          </View>
          <View>
            <Text style={{ color: colors.text }}>
              {moment(date.toISOString()).startOf("hour").fromNow()}
            </Text>
          </View>
        </View>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    width: Dimensions.get("screen").width,
    height: 300,
  },
  UserInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    display: "flex",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { marginLeft: 10, color: "#fff" },
  UserLinkAndShareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  UserLikeAndShare: {
    display: "flex",
    flexDirection: "row",
    marginRight: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
  };
};

export default connect(mapStateToProps, null)(Post);
