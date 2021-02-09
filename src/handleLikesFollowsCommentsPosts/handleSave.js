import { projectFirestore } from "../../config/config";

export const handleOnSave = (
  authenticated,
  postID,
  savedPosts,
  bs,
  alertMessage
) => {
  if (authenticated.isSignedIn) {
    if (savedPosts.includes(postID)) {
      onUnsave(authenticated.currentUser.uid, postID, alertMessage);
    } else {
      onSave(authenticated.currentUser.uid, postID, alertMessage);
    }
  } else {
    bs.current.snapTo(0);
  }
};

export const getSavedPosts = (userID, fetchSavedPosts) => {
  projectFirestore
    .collection("saving")
    .doc(userID)
    .collection("userSaving")
    .onSnapshot((snapshot) => {
      let savedPosts = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      fetchSavedPosts(savedPosts);
    });
};

export const onSave = (userID, postID, alertMessage) => {
  projectFirestore
    .collection("saving")
    .doc(userID)
    .collection("userSaving")
    .doc(postID)
    .set({})
    .then(() => alertMessage("You saved a post"))
    .catch((err) => alertMessage("Something went wrong. Unable to Save"));
};
export const onUnsave = (userID, postID, alertMessage) => {
  projectFirestore
    .collection("saving")
    .doc(userID)
    .collection("userSaving")
    .doc(postID)
    .delete()
    .then(() => alertMessage("You unsaved a post"))
    .catch((err) => alertMessage("Something went wrong. Unable to Save"));
};
