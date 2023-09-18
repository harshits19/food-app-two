import { useState } from "react";
import Accordion from "./MenuAccordion";
import { BiSolidLeaf } from "react-icons/bi";

const VegSection = ({ data, isVeg, setIsVeg }) => {
  return data?.isPureVeg ? (
    <div className="flex text-xs gap-x-2 font-semibold text-[#3d4152] items-center pb-4 border-b-[0.5px] border-b-[#d3d3d3]">
      <BiSolidLeaf className="text-green-600 text-xl" />
      PURE VEG
    </div>
  ) : (
    <div className="flex text-sm gap-x-2 font-bold text-[#3d4152] items-center pb-4 border-b-[0.5px] border-b-[#d3d3d3]">
      Veg Only
      <label className="switch w-[35px] h-[17px] inline-block relative">
        <input type="checkbox" />
        <span className="slider" onClick={() => setIsVeg(!isVeg)}></span>
      </label>
    </div>
  );
};
const TopPicksMenu = ({ data }) => {
  return (
    <div className="border-b-8 border-b-[#f1f1f6] pb-8">
      <div className="text-lg font-bold text-[#3e4152] py-4">{data?.title}</div>
      <div className="topPicks flex overflow-x-auto overflow-y-hidden gap-x-5">
        {data?.carousel?.map((item) => {
          return (
            <img
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_628,h_704/" +
                item?.creativeId
              }
              key={item?.bannerId}
              className="h-[337px] w-[300px] rounded-[20px]"
            />
          );
        })}
      </div>
    </div>
  );
};
const RestaurantMenu = ({ data, restInfo }) => {
  const [isVeg, setIsVeg] = useState(true);

  const accordionData = data?.map((item) => {
    if (item?.card?.card?.vegOnlyDetails) {
      return (
        <VegSection
          data={item?.card?.card}
          isVeg={isVeg}
          setIsVeg={setIsVeg}
          key={item?.card?.card?.vegOnlyDetails?.title}
        />
      );
    } else if (item?.card?.card?.carousel) {
      return (
        <TopPicksMenu data={item?.card?.card} key={item?.card?.card?.title} />
      );
    } else if (item?.card?.card?.itemCards || item?.card?.card?.categories) {
      return (
        <Accordion
          data={item?.card?.card}
          isVeg={isVeg}
          key={item?.card?.card?.title}
          restInfo={restInfo}
        />
      );
    }
  });
  return <section>{accordionData}</section>;
};
export default RestaurantMenu;
