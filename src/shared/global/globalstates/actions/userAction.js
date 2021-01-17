import { projectFirestore, auth } from "../../../../../config/config";
import * as actionTypes from "./actionTypes";
// const fetchUser = () => {
//   return (dispatch) => {
//     projectFirestore
//       .collection("users")
//       .doc(user.uid)
//       .onSnapshot((doc) => signIn({ ...doc.data(), uid: user.uid }));
//   };
// };
// export function fetchUserFollowing(userId) {
//   projectFirestore
//     .collection("following")
//     .doc(userId)
//     .collection("userFollowing")
//     .onSnapshot((snapshot) => {
//       let following = snapshot.docs.map((doc) => {
//         const id = doc.id;
//         return id;
//       });
//       return following;
//     });
// }
