import { projectFirestore } from "../../config/config";

export const handleOnComment = (
  authenticated,
  userID,
  postID,
  bs,
  text,
  alertMessage
) => {
  if (authenticated.isSignedIn) {
    onComment(userID, postID, authenticated, text, alertMessage);
  } else {
    bs.current.snapTo(0);
  }
};

export const getAllComments = (userID, postID, users, getComments) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("comments")
    .onSnapshot((snapshot) => {
      const comments = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        users.map((user) => {
          if (user.id === data.creator) {
            user = { userInfo: { ...user }, ...data, id };
            comments.push(user);
          }
        });
      });
      getComments(comments);
    });
};

const onComment = (userID, postID, authenticated, text, alertMessage) => {
  if (text !== "" && text !== undefined) {
    projectFirestore
      .collection("posts")
      .doc(userID)
      .collection("userPosts")
      .doc(postID)
      .collection("comments")
      .add({
        creator: authenticated.currentUser.uid,
        text: text,
      })
      .then(() => alertMessage("You commented on a post"))
      .catch((err) => alertMessage("Something went wrong. Unable to comment"));
  }
};

export const onDeleteComment = (userID, postID, commentID, alertMessage) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .collection("comments")
    .doc(commentID)
    .delete()
    .then(() => alertMessage("You delete a comment"))
    .catch((err) => alertMessage("Something went wrong. Unable to delete"));
};

export const onEditComment = (
  userID,
  postID,
  commentID,
  text,
  setText,
  clearText,
  Keyboard,
  bs,
  alertMessage
) => {
  if (text !== "" && text !== undefined)
    projectFirestore
      .collection("posts")
      .doc(userID)
      .collection("userPosts")
      .doc(postID)
      .collection("comments")
      .doc(commentID)
      .update({
        text: text,
      })
      .then(() => alertMessage("You edit a comment"))
      .catch((err) => alertMessage("Something went wrong. Unable to edit"));
  Keyboard.dismiss;
  setText("");
  clearText.current.clear();
  bs.current.snapTo(1);
};
