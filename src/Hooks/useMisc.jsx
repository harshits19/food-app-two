const filterItems = (data) => {
  const filterData = [];
  data?.map((cards) => {
    if (cards?.card?.card?.itemCards) {
      cards?.card?.card?.itemCards?.map((item) => filterData?.push(item?.card));
    }
    if (cards?.card?.card?.categories) {
      cards?.card?.card?.categories?.map((category) =>
        category?.itemCards?.map((item) => filterData?.push(item?.card)),
      );
    }
  });
  return filterData;
};
export { filterItems };
