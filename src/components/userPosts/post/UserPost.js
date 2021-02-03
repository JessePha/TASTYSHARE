import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import Swipable from "react-native-gesture-handler/Swipeable";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import * as actionTypes from "../../../shared/global/globalstates/actions/actionTypes";

const UserPost = ({ item, onDelete, onEdit, deletePost }) => {
  const { colors } = useTheme();

  const LeftAction = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        style={styles.detleteContainer}
        onPress={() => onPress(item.user, item.postID, deletePost)}
      >
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const RightAction = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        style={styles.editContainer}
        onPress={() => onPress(item)}
      >
        <Animated.Text style={[styles.editText, { transform: [{ scale }] }]}>
          Edit
        </Animated.Text>
      </TouchableOpacity>
    );
  };
  const handleDelete = () => {};

  return (
    <>
      <Swipable
        renderLeftActions={(progress, dragX) => (
          <LeftAction progress={progress} dragX={dragX} onPress={onDelete} />
        )}
        renderRightActions={(progress, dragX) => (
          <RightAction progress={progress} dragX={dragX} onPress={onEdit} />
        )}
      >
        <View
          style={{
            ...styles.ImageContainer,
            backgroundColor: colors.background,
            borderColor: colors.border,
          }}
        >
          <Image source={{ uri: item.imageuri }} style={styles.Image} />
          <View style={{ width: 200 }}>
            {item.title !== "" ? (
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {item.title}
              </Text>
            ) : (
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                No Title
              </Text>
            )}
            {item.price ? (
              <Text style={{ color: colors.text }}>{item.price}</Text>
            ) : null}
            {item.description !== "" ? (
              <Text
                numberOfLines={4}
                style={{ color: colors.text, marginBottom: 5 }}
              >
                {item.description}
              </Text>
            ) : (
              <Text style={{ color: colors.text, marginBottom: 5 }}>
                No description
              </Text>
            )}
            <Text style={{ color: colors.text }}>
              {item.createAt &&
                moment(item.createAt.toDate().toString()).calendar()}
            </Text>
          </View>
        </View>
      </Swipable>
    </>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  Image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  detleteContainer: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#e84545",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  deleteText: {
    color: "#fff",
    fontSize: 15,
  },
  editContainer: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "lightgreen",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  editText: {
    color: "#fff",
    fontSize: 20,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (postID) =>
      dispatch({ type: actionTypes.DELETE_POST, payload: postID }),
  };
};

export default connect(null, mapDispatchToProps)(UserPost);
