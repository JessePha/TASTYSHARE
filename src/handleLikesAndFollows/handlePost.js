import firebase from "firebase";
import { projectFirestore } from "../../config/config";

export const updatePost = (updateData, setMessage) => {
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
    .then(() => console.log("Successfully update post"))
    .catch((err) => console.log("An error occur, try again"));
};

export const onDelete = (userID, postID, deletePost, setMessage) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .doc(postID)
    .delete()
    .then(() => console.log("Succesfully delete post"))
    .catch((err) => console.log("An error occur, please try again"));
  deletePost(postID);
};

export const onAddPost = (userID, post, setLoading) => {
  projectFirestore
    .collection("posts")
    .doc(userID)
    .collection("userPosts")
    .add(post)
    .then(() => {
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

export const getPosts = (users, getAllPosts, setRefreshing) => {
  const data = [];
  let getData = [];
  users.forEach((user) => {
    getData.push(
      new Promise((resolve) => {
        projectFirestore
          .collection("posts")
          .doc(user.id)
          .collection("userPosts")
          .get()
          .then((posts) => {
            posts.forEach((post) => {
              data.push({
                ...post.data(),
                postID: post.id,
                userInfo: { ...user },
              });
            });
            resolve(data);
          });
      })
    );
  });
  Promise.all(getData).then(() => {
    getAllPosts(data);
    setRefreshing(false);
  });
};
