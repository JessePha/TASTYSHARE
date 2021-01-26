import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import GeoCoder from "react-native-geocoding";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
GeoCoder.init("AIzaSyBlcHfmNg4AXbWkHg72eX5HSCGBcSgteoQ");

const FoodBottomSheet = ({
  navigation,
  authenticated,
  bs,
  bs1,
  item,
  like,
  setLike,
  handleOnLike,
  comments,
}) => {
  const [location, setLocation] = useState();
  const { colors } = useTheme();
  useEffect(() => {
    if (item.location) {
      GeoCoder.from(item.location).then((json) => {
        const location = {
          latitude: json.results[0].geometry.viewport.northeast.lat,
          longitude: json.results[0].geometry.viewport.northeast.lng,
          latitudeDelta: 0.095,
          longitudeDelta: 0.035,
        };
        setLocation(location);
      });
    }
  }, [item.location]);

  const header = () => (
    <View style={{ ...styles.header, backgroundColor: colors.background }}>
      <View style={styles.UserInfoContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("userProfile", { item })}
        >
          {item.userInfo.imageuri ? (
            <Image
              source={{ uri: item.userInfo.imageuri }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <View
              style={{
                display: "flex",
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
        <FontAwesome name="bookmark-o" size={20} color="gray" />
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
              bs
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
      </View>
    </View>
  );

  const content = () => (
    <View style={styles.content}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: colors.background,
          height: 40,
          padding: 5,
        }}
      >
        <Text style={{ color: "gray" }}>{`Comments: ${comments.length}`}</Text>
        <Text style={{ color: "gray", paddingLeft: 10 }}>{`likes: ${
          item.likesCount ? item.likesCount : 0
        }`}</Text>
      </View>
      <View
        style={{ flex: 1, padding: 15, backgroundColor: colors.background }}
      >
        <Text style={{ color: colors.text }}>
          {item.description ? item.description : "No description"}
        </Text>
      </View>
      {location && (
        <View style={{ flex: 5, marginTop: 10 }}>
          <MapView style={StyleSheet.absoluteFill} region={location}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={`${item.location}`}
            ></Marker>
          </MapView>
        </View>
      )}
      <View></View>
    </View>
  );
  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={["20%", "60%"]}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: -1, height: -3 },
    shadowOpacity: 0.4,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    backgroundColor: "white",
    height: Dimensions.get("screen").height - 300,
  },
  Image: {
    width: Dimensions.get("screen").width,
    height: 300,
    backgroundColor: "#C4C4C4",
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
    height: 300,
  },
});

const mapStateToProps = (state) => {
  return {
    comments: state.auth.comments,
  };
};

export default connect(mapStateToProps, null)(FoodBottomSheet);
