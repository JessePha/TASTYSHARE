import { projectFirestore } from "../../config/config";

export const handleOnLike = (
  authenticated,
  userID,
  postID,
  like,
  setLike,
  bs,

) => {
  if (authenticated.isSignedIn) {
    if (like) {
      onDislike(userID, postID, authenticated);
    } else {
      onLike(userID, postID, authenticated);
    }
    setLike(!like);
  } else {
    bs.current.snapTo(0);
  }
};

const onLike = (userID, postID, authenticated) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("likes")
    .doc(authenticated.currentUser.uid)
    .set({});
};

const onDislike = (userID, postID, authenticated) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("likes")
    .doc(authenticated.currentUser.uid)
    .delete();
};
