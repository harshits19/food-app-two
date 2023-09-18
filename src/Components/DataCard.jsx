import { MdStars } from "react-icons/md";
const DataCard = ({ item }) => {
  return (
    <div className="w-full h-full grid grid-flow-row justify-stretch hover:scale-95 duration-100">
      <div className="relative">
        <div className="h-full w-full">
          <img
            className="rounded-2xl w-full h-full object-cover min-h-[130px] max-h-[170px]"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
              item?.info?.cloudinaryImageId
            }
          />
        </div>
        <div className="drop-shadow-dataCardFilter grid content-end text-left w-full h-full absolute inset-0 rounded-2xl p-2 bg-[linear-gradient(rgba(27,30,36,0)_0%,rgb(27,30,36)_84.21%)]">
          {item?.info?.aggregatedDiscountInfoV3?.subHeader && (
            <div className="textEllipse text-ellipsis overflow-hidden w-full break-words text-[#ffffffeb] text-xl font-extrabold">
              {item?.info?.aggregatedDiscountInfoV3?.header +
                " " +
                item?.info?.aggregatedDiscountInfoV3?.subHeader}
            </div>
          )}
        </div>
      </div>
      <div className="p-2">
        <div className="textEllipse text-ellipsis overflow-hidden w-full break-words font-medium tracking-tight text-xl text-[#02060cbf]">
          {item?.info?.name}
        </div>
        <div className="flex items-center font-semibold gap-x-1 text-base">
          <span className="text-green-600 text-xl">
            <MdStars />
          </span>
          <span className="text-[#02060cbf] text-base">
            {item?.info?.avgRatingString}
          </span>
        </div>
        <div className="textEllipse text-ellipsis overflow-hidden w-full break-words text-defGray">
          {item?.info?.cuisines?.join(", ")}
        </div>
      </div>
    </div>
  );
};
export default DataCard;
