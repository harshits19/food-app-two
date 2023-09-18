const useFetchRestMenu = async ({ resId, lat, long, setData }) => {
  const res = await fetch(
    `https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}`
  );
  const data = await res.json();
  setData({
    info: data?.data?.cards[0]?.card?.card?.info,
    offers:
      data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers,
    restList: data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards,
  });
};
export default useFetchRestMenu;
