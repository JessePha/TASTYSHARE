import { projectFirestore } from "../../config/config";

export const getFollowings = (authenticated, fetchFollowing) => {
  projectFirestore
    .collection("following")
    .doc(authenticated)
    .collection("userFollowing")
    .onSnapshot((snapshot) => {
      let following = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      fetchFollowing(following);
    });
};

export const fetchFollowers = (users, getFollowers) => {
  let allFollowers = [];
  let data = {};
  users.forEach((user) =>
    allFollowers.push(
      new Promise((resolve) => {
        projectFirestore
          .collection("following")
          .doc(user.id)
          .collection("userFollowing")
          .get()
          .then((snapshot) => {
            let followers = snapshot.docs.map((doc) => {
              const id = doc.id;
              return id;
            });
            resolve((data = { ...data, [user.id]: [...followers] }));
          })
          .catch();
      })
    )
  );
  Promise.all(allFollowers).then(() => {
    getFollowers(data);
  });
};

export const onFollow = (userID, postUser, setFollowingState) => {
  setFollowingState(true);
  projectFirestore
    .collection("following")
    .doc(userID)
    .collection("userFollowing")
    .doc(postUser)
    .set({})
    .then()
    .catch();
};
export const onUnfollow = (userID, postUser, setFollowingState) => {
  setFollowingState(false);
  projectFirestore
    .collection("following")
    .doc(userID)
    .collection("userFollowing")
    .doc(postUser)
    .delete()
    .then()
    .catch();
};
