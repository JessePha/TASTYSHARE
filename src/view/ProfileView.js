import React from "react";
import { View, Image, StyleSheet } from "react-native";
import CustomBar from "../components/UI/CustomBar";
import { SimpleLineIcons } from "@expo/vector-icons";
import UserPosts from "../components/userPosts/UserPosts";
import { connect } from "react-redux";

const ProfileView = ({ route, getAllPosts, navigation }) => {
  const { item } = route.params;

  const userPosts = getAllPosts.filter((post) => post.user === item.user);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <CustomBar
          text={`${item.userInfo.firstName} ${item.userInfo.lastName}`}
          textColor="black"
          userIconHeight={70}
          userIconWidth={70}
          bgColor="white"
          height={2}
          iconBgColor="darkgray"
          image={
            <Image
              source={{ uri: item.userInfo.imageuri }}
              style={{ width: 65, height: 65, borderRadius: 35 }}
            />
          }
          icon={<SimpleLineIcons name="user-follow" size={20} color="white" />}
          iconHeight={50}
          iconWidth={50}
          generalIconBgColor="lightgreen"
        />
      </View>
      <View style={styles.postsContainer}>
        <View style={styles.postsInnerContainer}>
          <UserPosts posts={userPosts} navigation={navigation} />
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

const mapStateToProps = (state) => {
  return {
    getAllPosts: state.pts.posts,
  };
};

export default connect(mapStateToProps, null)(ProfileView);
