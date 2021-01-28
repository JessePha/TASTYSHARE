export const filterByDateAsc = (data) => {
  const temp = data.slice();
  const filteredData = temp.sort((a, b) => b.createAt - a.createAt);
  return filteredData;
};
export const filterByPopularityAsc = (data) => {
  const temp = data.slice();
  const filteredData = temp.sort((a, b) => b.likesCount - a.likesCount);
  return filteredData;
};
export const filterByCategoryDsc = (data) => {
  const temp = data.slice();
  const filteredData = temp.sort((a, b) => b.category < a.category);
  return filteredData;
};
export const filterByLocationDsc = (data) => {
  const temp = data.slice();
  const filteredData = temp.sort((a, b) => b.location < a.location);
  return filteredData;
};
