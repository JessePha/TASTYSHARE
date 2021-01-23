import { projectFirestore } from "../../config/config";

export const handleOnComment = (authenticated, userID, postID, bs, text) => {
  if (authenticated.isSignedIn) {
    onComment(userID, postID, authenticated, text);
  } else {
    bs.current.snapTo(0);
  }
};

const onComment = (userID, postID, authenticated, text) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("comments")
    .add({
      creator: authenticated.currentUser.uid,
      text: text,
    });
};

export const onDeleteComment = (userID, postID, commentID) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("comments")
    .doc(commentID)
    .delete();
};
