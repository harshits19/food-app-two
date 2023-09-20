import { REST_MENU_URL } from "../Utilities/Constants";

const useFetchRestMenu = async ({ resId, lat, long, setData }) => {
  const res = await fetch(
    `${REST_MENU_URL}&lat=${lat}&lng=${long}&restaurantId=${resId}`,
  );
  const data = await res.json();
  setData({
    info: data?.data?.cards[0]?.card?.card?.info,
    offers:
      data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers,
    restList:
      data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
      data?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards,
  });
};
export default useFetchRestMenu;
