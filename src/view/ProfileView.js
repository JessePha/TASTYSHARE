import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomBar from "../components/UI/CustomBar";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import UserPosts from "../components/userPosts/UserPosts";

const ProfileView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <CustomBar
          text="Username"
          textColor = "black"
          userIconHeight={70}
          userIconWidth={70}
          bgColor="white"
          height={2}
          iconBgColor="darkgray"
          image={<AntDesign name="user" size={40} color="white" />}
          icon={<SimpleLineIcons name="user-follow" size={20} color="white" />}
          iconHeight={50}
          iconWidth={50}
          generalIconBgColor="lightgreen"
        />
      </View>
      <View style={styles.postsContainer}>
        <View style={styles.postsInnerContainer}>
          <UserPosts />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5A595B",
  },
  profileContainer: {
    flex: 1,
  },
  postsContainer: {
    flex: 6,
  },
  postsInnerContainer: {
    flex: 1,
  },
});

export default ProfileView;
