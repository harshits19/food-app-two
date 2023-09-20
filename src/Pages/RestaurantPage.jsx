import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationState } from "../Utilities/AppSlice";
import RestaurantInfo from "../Components/RestaurantInfo";
import RestaurantMenu from "../Components/RestaurantMenu";
import useFetchRestMenu from "../Hooks/useFetchRestMenu";
import useTitle from "../Hooks/useTitle";
import CartModal from "../Components/CartModal";
import RestaurantBottomSection from "../Components/RestaurantBottomSection";
import RestaurantPageShimmer from "../Components/RestaurantPageShimmer";
import { fetchRestaurantData } from "../Utilities/RestSlice";

const RestaurantPage = () => {
  const { resId } = useParams();
  const dispatch = useDispatch();
  const userLocation = useSelector(selectLocationState);
  const [data, setData] = useState([]);
  useEffect(() => {
    useFetchRestMenu({
      lat: userLocation?.lat,
      long: userLocation?.long,
      resId: resId,
      setData: setData,
    });
    dispatch(
      fetchRestaurantData({
        lat: userLocation?.lat,
        long: userLocation?.long,
        resId: resId,
      }),
    );
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    document.getElementById("header").style.position = "inherit";
    if (mediaQuery.matches) {
      document.getElementById("mobileNav").style.display = "none";
      document.getElementById("shortHeader").style.display = "none";
    }
    return () => {
      document.getElementById("header").style.position = "sticky";
      if (mediaQuery.matches) {
        document.getElementById("mobileNav").style.display = "block";
        document.getElementById("shortHeader").style.display = "block";
      }
    };
  }, []);
  useTitle(data?.info?.name && data.info.name + " | Order Online");
  return data?.info ? (
    <>
      <div className="mx-auto my-2 flex min-h-[800px] max-w-[800px] flex-col md:my-5 md:px-4">
        <RestaurantInfo data={data?.info} offers={data?.offers} />
        <div className="h-full w-full px-4 py-8">
          <RestaurantMenu
            data={data?.restList}
            restInfo={{
              name: data?.info?.name,
              areaName: data?.info?.areaName,
              resId: data?.info?.id,
              dp: data?.info?.cloudinaryImageId,
              distance: data?.info?.sla?.lastMileTravelString,
              delFees: data?.info?.feeDetails?.totalFee,
            }}
          />
          <RestaurantBottomSection data={data?.restList} />
        </div>
      </div>
      <CartModal />
    </>
  ) : (
    <>
      <RestaurantPageShimmer />
    </>
  );
};
export default RestaurantPage;
