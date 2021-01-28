import firebase from "firebase";
import { projectFirestore } from "../../config/config";
export const updatePost = (updateData) => {
  projectFirestore
    .collection("posts")
    .doc(updateData.user)
    .collection("userPosts")
    .doc(updateData.postID)
    .update({
      category: updateData.category,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      description: updateData.description,
      imageuri: updateData.imageuri,
      likesCount: updateData.likesCount,
      location: updateData.location,
      price: updateData.price,
      title: updateData.title,
      user: updateData.user,
    })
    .then(() => console.log("error"))
    .catch((err) => console.log("error", err));
};

export const onDelete = (userID, postID) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .delete()
    .then(() => console.log("deleted"))
    .catch((err) => console.log("error: ", err));
};
