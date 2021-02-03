import { projectFirestore } from "../../config/config";

export const handleOnLike = (
  authenticated,
  userID,
  postID,
  like,
  setLike,
  countLikes,
  setCountLikes,
  bs
) => {
  if (authenticated.isSignedIn) {
    if (like) {
      onDislike(userID, postID, authenticated);
      if (countLikes > 0) setCountLikes(countLikes - 1);
      else setCountLikes(0);
    } else {
      onLike(userID, postID, authenticated);
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

const onLike = (userID, postID, authenticated) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("likes")
    .doc(authenticated.currentUser.uid)
    .set({})
    .then(() => console.log("You like a post"))
    .catch((err) => console.log("Something went wrong. Unable to like"));
};

const onDislike = (userID, postID, authenticated) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("likes")
    .doc(authenticated.currentUser.uid)
    .delete()
    .then(() => console.log("You dislike a post"))
    .catch((err) => console.log("Something went wrong. Unable to dislike"));
};
