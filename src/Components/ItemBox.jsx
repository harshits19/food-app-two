import { useMemo } from "react";
import { BiRupee } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, selectCartItem } from "../Utilities/CartSlice";

const ItemBox = ({ data, restInfo }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItem);
  const currentItem = useMemo(
    () => cartItems.find((item) => item.id == data?.info?.id),
    [cartItems]
  );

  return (
    <div className="justify-between flex mx-0 my-5 pt-0 pb-5 px-0 border-b-[0.5px] border-b-[#d3d3d3]">
      <div className="w-[80%]">
        <div>
          {data?.info?.isVeg ? (
            <img
              className="h-5 w-5"
              src="https://foodsimp.netlify.app/vegFoodIcon.47b449ec.png"
            />
          ) : (
            <img
              className="h-5 w-5"
              src="https://foodsimp.netlify.app/nonVegFoodIcon.7b3936e7.png"
            />
          )}
        </div>
        <div className="text-[#3e4152] text-base font-medium break-words">
          {data?.info?.name}
        </div>
        <div className="text-[#3e4152] text-sm font-normal mt-[2px] flex items-center">
          <BiRupee />
          {data?.info?.price
            ? data?.info?.price / 100
            : data?.info?.finalPrice
            ? data?.info?.finalPrice / 100
            : data?.info?.defaultPrice / 100}
        </div>
        <div className=" w-[98%] text-[#282c3f73] tracking-tighter text-sm leading-[1.3] mt-2">
          {data?.info?.description}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[20%]">
        {data?.info?.imageId && (
          <img
            className="w-[118px] h-[96px] mb-[-30px] rounded-md"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
              data?.info?.imageId
            }
          />
        )}
        {!currentItem ? (
          <div
            className="shadow-[0_3px_8px_#e9e9eb] rounded h-9 w-24 border cursor-pointer bg-white flex text-[#60b246] border-solid border-[#d4d5d9] justify-center items-center text-[13px] font-semibold"
            onClick={() => dispatch(addItem(data?.info, restInfo))}>
            ADD
          </div>
        ) : (
          <div className="shadow-[0_3px_8px_#e9e9eb] rounded h-9 w-24 border cursor-pointer bg-white flex text-[#60b246] border-solid border-[#d4d5d9]  items-center justify-around text-sm">
            <span
              className="text-[#bebfc5] text-[18px]"
              onClick={() => dispatch(removeItem({ cartItem: data?.info }))}>
              -
            </span>
            {currentItem?.qty}
            <span
              className="animate-[0.2s_ease] text-[18px] hover:scale-125"
              onClick={() => dispatch(addItem(data?.info, restInfo))}>
              +
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default ItemBox;
