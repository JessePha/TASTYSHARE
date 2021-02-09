export const search = (posts, input) => {
  const searchData = posts.filter(
    (post) =>
      post.category.toLowerCase().includes(input.trim().toLocaleLowerCase()) ||
      post.location.toLowerCase().includes(input.trim().toLocaleLowerCase()) ||
      post.userInfo.firstName
        .toLowerCase()
        .includes(input.trim().toLocaleLowerCase()) ||
      post.userInfo.lastName
        .toLowerCase()
        .includes(input.trim().toLocaleLowerCase()) ||
      post.title.toLowerCase().includes(input.trim().toLocaleLowerCase())
  );
  return searchData;
};
