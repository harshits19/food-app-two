import { Link } from "react-router-dom";
import { PieBtn, RupeeBtn, SearchBtn } from "../Assets/SVG";
import { AiFillStar } from "react-icons/ai";
import OffersBox from "./OffersBox";
const RestaurantInfo = ({ data, offers }) => {
  return (
    <div>
      <div className="h-10 text-[#93959f] justify-between text-[9.5px] flex pt-2">
        <div className="">
          <span>
            <Link to={"/"}>Home</Link>
          </span>
          <span>{" / " + data?.city}</span>
          <span>{" / " + data?.name}</span>
        </div>
        <div className="cursor-pointer">
          <Link to="./search=true">
            <SearchBtn classList={"h-5 w-5 fill-[#3d4152] mr-4"} />
          </Link>
        </div>
      </div>
      <div className="h-full justify-between flex mx-4 my-0 px-0 py-5 border-b-[#d3d3d3] border-b border-dashed">
        <div>
          <p className="text-[1.2rem] font-bold mb-2">{data?.name}</p>
          <p className="text-[#7e808c] text-ellipsis whitespace-nowrap text-[13px] overflow-hidden">
            {data?.cuisines?.join(", ")}
          </p>
          <p className="text-[#7e808c] text-ellipsis whitespace-nowrap text-[13px] overflow-hidden">
            {data?.areaName +
              ", " +
              (data?.sla?.lastMileTravelString &&
                data?.sla?.lastMileTravelString)}
          </p>
          <div className="text-[#7e808c] text-sm mt-3">
            {data?.feeDetails?.message}
          </div>
        </div>
        <div>
          <div className="text-center max-w-[100px] cursor-pointer border shadow-[0_1px_5px_#f9f9f9] p-2 rounded-md border-[#e9e9eb]">
            <div className="font-bold pb-2 border-b-[#e9e9eb] border-b  text-green-600 flex items-center justify-center">
              <AiFillStar />
              {data?.avgRating}
            </div>
            <p className="text-[#8b8d97] pt-2 text-[10px] font-medium">
              {data?.totalRatingsString}
            </p>
          </div>
        </div>
      </div>
      <div className="text-[#3e4152] text-sm font-bold relative mx-0 my-4 px-4 py-0 flex">
        <span className="mr-6 flex items-center gap-x-2 ">
          <PieBtn classList={"h-4 w-4"} />
          {data?.sla?.slaString || data?.orderabilityCommunication?.title?.text}
        </span>
        <span className="mr-6 flex items-center gap-x-2">
          <RupeeBtn classList={"h-4 w-4"} />
          {data?.costForTwoMessage}
        </span>
      </div>
      {data?.orderabilityCommunication?.message?.text && (
        <div className="text-[#f57e47] bg-[#f1f1f6] font-normal relative mb-4 pl-4 pr-[18px] py-3.5 rounded-lg">
          {data?.orderabilityCommunication?.message?.text}
        </div>
      )}
      <div className="flex overflow-x-scroll overflow-y-hidden mx-2 my-0 offerContainer">
        {offers?.map((item) => {
          return <OffersBox item={item} key={item?.info?.offerIds[0]} />;
        })}
      </div>
    </div>
  );
};
export default RestaurantInfo;
