import { MdStars } from "react-icons/md";
const DataCard = ({ item }) => {
  return (
    <div className="flex h-full w-full grid-flow-row justify-stretch duration-100 hover:scale-95 sm:grid">
      <div className="relative">
        <div className="h-28 w-28 sm:h-full sm:w-full">
          <img
            className="h-28 w-28 rounded-2xl object-cover sm:h-full sm:max-h-[170px] sm:min-h-[130px] sm:w-full"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
              item?.info?.cloudinaryImageId
            }
          />
        </div>
        <div className="absolute inset-0 hidden h-full w-full content-end rounded-2xl bg-[linear-gradient(rgba(27,30,36,0)_0%,rgb(27,30,36)_84.21%)] p-2 text-left drop-shadow-dataCardFilter sm:grid">
          {item?.info?.aggregatedDiscountInfoV3?.subHeader && (
            <div className="textEllipse w-full overflow-hidden text-ellipsis break-words text-xl font-extrabold text-[#ffffffeb]">
              {item?.info?.aggregatedDiscountInfoV3?.header +
                " " +
                item?.info?.aggregatedDiscountInfoV3?.subHeader}
            </div>
          )}
        </div>
      </div>
      <div className="p-2">
        <div className="textEllipse w-full overflow-hidden text-ellipsis break-words text-xl font-medium tracking-tight text-[#02060cbf]">
          {item?.info?.name}
        </div>
        <div className="flex items-center gap-x-1 text-base font-semibold">
          <span className="text-xl text-green-600">
            <MdStars />
          </span>
          <span className="text-base text-[#02060cbf]">
            {item?.info?.avgRatingString}
          </span>
        </div>
        <div className="textEllipse w-full overflow-hidden text-ellipsis break-words text-defGray">
          {item?.info?.cuisines?.join(", ")}
        </div>
      </div>
    </div>
  );
};
export default DataCard;
