import { Link, useNavigate } from "react-router-dom";
import { PieBtn, RupeeBtn } from "../Assets/SVG";
import { AiFillStar } from "react-icons/ai";
import OffersBox from "./OffersBox";
import { BsArrowLeft } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
const RestaurantInfo = ({ data, offers }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex h-10 items-center justify-between pt-2 text-[9.5px] text-[#93959f]">
        <div className="hidden md:block">
          <span>
            <Link to={"/"}>Home</Link>
          </span>
          <span>{" / " + data?.city}</span>
          <span>{" / " + data?.name}</span>
        </div>
        <div className="md:hidden">
          <Link onClick={() => navigate(-1)}>
            <BsArrowLeft className="ml-4 h-8 w-7 fill-[#3d4152]" />
          </Link>
        </div>
        <div className="cursor-pointer">
          <Link to="search">
            <MdSearch className="mr-4 h-7 w-7 fill-[#3d4152]  font-bold" />
          </Link>
        </div>
      </div>
      <div className="mx-4 my-0 flex h-full justify-between border-b border-dashed border-b-[#d3d3d3] px-0 py-5">
        <div>
          <p className="mb-2 text-[1.2rem] font-bold">{data?.name}</p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#7e808c]">
            {data?.cuisines?.join(", ")}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#7e808c]">
            {data?.areaName +
              ", " +
              (data?.sla?.lastMileTravelString &&
                data?.sla?.lastMileTravelString)}
          </p>
          <div className="mt-3 text-sm text-[#7e808c]">
            {data?.feeDetails?.message}
          </div>
        </div>
        <div>
          <div className="max-w-[100px] cursor-pointer rounded-md border border-[#e9e9eb] p-2 text-center shadow-[0_1px_5px_#f9f9f9]">
            <div className="flex items-center justify-center border-b  border-b-[#e9e9eb] pb-2 font-bold text-green-600">
              <AiFillStar />
              {data?.avgRating}
            </div>
            <p className="pt-2 text-[10px] font-medium text-[#8b8d97]">
              {data?.totalRatingsString}
            </p>
          </div>
        </div>
      </div>
      <div className="relative mx-0 my-4 flex px-4 py-0 text-sm font-bold text-[#3e4152]">
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
        <div className="relative mb-4 rounded-lg bg-[#f1f1f6] py-3.5 pl-4 pr-[18px] font-normal text-[#f57e47]">
          {data?.orderabilityCommunication?.message?.text}
        </div>
      )}
      <div className="offerContainer mx-2 my-0 flex overflow-y-hidden overflow-x-scroll">
        {offers?.map((item) => {
          return <OffersBox item={item} key={item?.info?.offerIds[0]} />;
        })}
      </div>
    </div>
  );
};
export default RestaurantInfo;
