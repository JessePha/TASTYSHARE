import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { handleOnLike } from "../../handleLikesFollowsCommentsPosts/handleLikes";
import { handleOnSave } from "../../handleLikesFollowsCommentsPosts/handleSave";
import { appColors } from "../../shared/global/colors/colors";

const FoodBottomSheet = ({
  navigation,
  authenticated,
  bs,
  bs1,
  item,
  like,
  setLike,
  comments,
  alertMessage,
  savedPosts,
}) => {
  const [countLikes, setCountLikes] = useState(item.likesCount);
  const { colors } = useTheme();
  const [isTruncated, setIsTruncated] = useState(true);
  const resultString = isTruncated
    ? item.description.slice(0, 100)
    : item.description;

  const initialRegion = {
    latitude: 57.930021,
    longitude: 12.536211,
    latitudeDelta: 0.093,
    longitudeDelta: 0.033,
  };

  const onNavigate = (item) => {
    if (authenticated.currentUser) {
      item.user === authenticated.currentUser.uid
        ? navigation.navigate("Profile", {
            screen: "userpost",
            params: { item },
          })
        : navigation.navigate("userProfile", { item });
    } else {
      navigation.navigate("userProfile", { item });
    }
  };

  const header = () => (
    <View
      style={{
        ...styles.header,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.innderHeader}>
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
                  width: 40,
                  height: 40,
                  backgroundColor: colors.iconBackgroundColor,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
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
        <View style={styles.UserLikeAndComments}>
          <AntDesign
            name={like ? "like1" : "like2"}
            size={20}
            color="gray"
            style={{ marginLeft: 10 }}
            onPress={() =>
              handleOnLike(
                authenticated,
                item.user,
                item.postID,
                like,
                setLike,
                countLikes,
                setCountLikes,
                bs,
                alertMessage
              )
            }
          />
          <Feather
            name="message-square"
            size={20}
            color="gray"
            style={{ marginLeft: 10 }}
            onPress={() => bs1.current.snapTo(0)}
          />
          <FontAwesome
            name={savedPosts.includes(item.postID) ? "bookmark" : "bookmark-o"}
            size={20}
            color="gray"
            style={{ marginLeft: 10 }}
            onPress={() =>
              handleOnSave(
                authenticated,
                item.postID,
                savedPosts,
                bs,
                alertMessage
              )
            }
          />
        </View>
      </View>
      <View
        style={{
          ...styles.likesAndCommentsCount,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Text
            style={{ color: "gray" }}
          >{`Comments: ${comments.length}`}</Text>
          <Text style={{ color: "gray", paddingLeft: 10 }}>{`likes: ${
            countLikes ? countLikes : 0
          }`}</Text>
        </View>
      </View>
    </View>
  );

  const content = () => (
    <View style={styles.content}>
      <View
        style={{
          padding: 15,
          backgroundColor: colors.background,
          marginBottom: 20,
        }}
      >
        <View style={{ paddingBottom: 20 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.text, fontWeight: "bold" }}
          >
            {item.title ? item.title : "No title"}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            Desciption
          </Text>
          <ScrollView>
            <Text numberOfLines={20} style={{ color: colors.text }}>
              {item.description ? `${resultString}` : "No description"}
            </Text>
            <TouchableOpacity onPress={() => setIsTruncated(!isTruncated)}>
              {resultString.length > 50 ? (
                <Text style={{ fontWeight: "bold", color: colors.text }}>
                  {isTruncated ? "... Show more" : "Show less"}
                </Text>
              ) : null}
            </TouchableOpacity>
          </ScrollView>
        </View>
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title={`${item.location}`}
          ></Marker>
        </MapView>
      </View>
    </View>
  );
  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={["20%", "50%"]}
        renderHeader={header}
        renderContent={content}
        initialPosition={"50%"} //200, 300
        isBackDrop={true}
        isBackDropDismisByPress={true}
        isRoundBorderWithTipHeader={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    shadowColor: appColors.shadowColor,
    shadowOffset: { width: -1, height: -3 },
    shadowOpacity: 0.4,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innderHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 10,
  },
  content: {
    backgroundColor: appColors.bottomSheetContent,
    height: Dimensions.get("screen").height - 300,
  },
  likesAndCommentsCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  Image: {
    width: Dimensions.get("screen").width,
    height: 300,
    backgroundColor: appColors.bottomSheetContent,
  },
  UserInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  UserLikeAndComments: {
    display: "flex",
    flexDirection: "row",
  },
  userName: { marginLeft: 10 },
  map: {
    width: Dimensions.get("screen").width,
    height: 250,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    comments: state.auth.comments,
  };
};

export default connect(mapStateToProps, null)(FoodBottomSheet);
