const OffersBox = ({ item }) => {
  return (
    <div className="mr-3">
      <div className="h-full min-w-[200px] cursor-pointer text-left border items-center flex shadow-[0_1px_2px_#0000000a] p-2 rounded-lg border-[#e9e9eb]">
        {item?.info?.offerTag && (
          <div className="text-[#e46d47] font-bold text-[9px] rotate-180 text-center pl-1 border-l-[#e9e9eb] border-l border-solid flatDeals">
            <span>{item?.info?.offerTag}</span>
          </div>
        )}
        <div className="flex flex-col justify-center ml-2">
          <p className="whitespace-nowrap text-[#686b78] items-center text-sm font-bold flex">
            <img
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/" +
                item?.info?.offerLogo
              }
              className="h-5 w-5 mr-2"
            />
            {item?.info?.header}
          </p>
          <p className="text-[#93959f] text-ellipsis whitespace-nowrap max-w-[200px] text-[11px] font-semibold overflow-hidden mt-1">
            {item?.info?.couponCode} | {item?.info?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OffersBox;
