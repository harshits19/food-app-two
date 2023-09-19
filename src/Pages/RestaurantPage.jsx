import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLocationState } from "../Utilities/AppSlice";
import RestaurantInfo from "../Components/RestaurantInfo";
import RestaurantMenu from "../Components/RestaurantMenu";
import useFetchRestMenu from "../Hooks/useFetchRestMenu";
import UseTop from "../Hooks/useTop";
import CartModal from "../Components/CartModal";
import RestaurantBottomSection from "../Components/RestaurantBottomSection";

const RestaurantPage = () => {
  const { resId } = useParams();
  const userLocation = useSelector(selectLocationState);
  const [data, setData] = useState([]);
  useEffect(() => {
    useFetchRestMenu({
      lat: userLocation?.lat,
      long: userLocation?.long,
      resId: resId,
      setData: setData,
    });
    document.getElementById("header").style.position = "inherit";
    return () => (document.getElementById("header").style.position = "sticky");
  }, []);
  return data ? (
    <>
      <div className="mx-auto my-5 flex min-h-[800px] max-w-[800px] flex-col px-4">
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
      <UseTop />
      <CartModal />
    </>
  ) : (
    <></>
  );
};
export default RestaurantPage;
