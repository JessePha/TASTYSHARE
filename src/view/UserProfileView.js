import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import CustomBar from "../components/UI/CustomBar";
import UserPosts from "../components/userPosts/UserPosts";
import { AntDesign } from "@expo/vector-icons";

const ProfileView = ({ allPosts, navigation, authenticated }) => {
  const { colors } = useTheme();
  const userPosts = allPosts.filter(
    (post) => post.user === authenticated.currentUser.uid
  );
  return userPosts.length > 0 ? (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.profileContainer}>
        {
          <CustomBar
            text={`${userPosts[0].userInfo.firstName} ${userPosts[0].userInfo.lastName}`}
            textColor={colors.text}
            userIconHeight={60}
            userIconWidth={60}
            bgColor={colors.card}
            height={2}
            iconBgColor={colors.iconBackgroundColor}
            image={
              userPosts[0].userInfo.imageuri ? (
                <Image
                  source={{ uri: item.userInfo.imageuri }}
                  style={{ width: 65, height: 65, borderRadius: 35 }}
                />
              ) : (
                <AntDesign name="user" size={25} color={colors.iconColor} />
              )
            }
            iconHeight={40}
            iconWidth={40}
            isAuth={authenticated.isSignedIn}
          />
        }
      </View>
      <View style={styles.postsContainer}>
        <View style={styles.postsInnerContainer}>
          <UserPosts posts={userPosts} navigation={navigation} />
        </View>
      </View>
    </View>
  ) : (
    <View
      style={{ ...styles.noPostContainer, backgroundColor: colors.background }}
    >
      <AntDesign name="meh" size={34} color={colors.text} />
      <Text style={{ color: colors.text }}>You don't have any post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    marginBottom: 10,
  },
  postsContainer: {
    flex: 7,
  },
  postsInnerContainer: {
    flex: 1,
  },
  noPostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    allPosts: state.pts.posts,
    authenticated: state.auth,
  };
};

export default connect(mapStateToProps, null)(ProfileView);