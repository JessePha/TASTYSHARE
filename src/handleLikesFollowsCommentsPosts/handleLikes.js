import { projectFirestore } from "../../config/config";

export const handleOnLike = (
  authenticated,
  userID,
  postID,
  like,
  setLike,
  countLikes,
  setCountLikes,
  bs,
  alertMessage,
) => {
  if (authenticated.isSignedIn) {
    if (like) {
      onDislike(userID, postID, authenticated, alertMessage);
      if (countLikes > 0) setCountLikes(countLikes - 1);
      else setCountLikes(0);
    } else {
      onLike(userID, postID, authenticated, alertMessage);
      setCountLikes(countLikes + 1);
    }
    setLike(!like);
  } else {
    bs.current.snapTo(0);
  }
};

export const getLikes = (authenticated, userID, postID, setLike) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("likes")
    .doc(authenticated)
    .onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setLike(true);
      } else setLike(false);
    });
};

const onLike = (userID, postID, authenticated, alertMessage) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("likes")
    .doc(authenticated.currentUser.uid)
    .set({})
    .then(() => alertMessage("You like a post"))
    .catch((err) => alertMessage("Something went wrong. Unable to like"));
};

const onDislike = (userID, postID, authenticated, alertMessage) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("likes")
    .doc(authenticated.currentUser.uid)
    .delete()
    .then(() => alertMessage("You dislike a post"))
    .catch((err) => alertMessage("Something went wrong. Unable to dislike"));
};
