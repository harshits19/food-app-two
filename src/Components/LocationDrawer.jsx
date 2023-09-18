import { BsXLg } from "react-icons/bs";
import useCurrentLocation from "../Hooks/useCurrentLocation";
import { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { BiTargetLock } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import useSearchLocation from "../Hooks/useSearchLocation";

import { addLocation } from "../Utilities/AppSlice";
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
const LocationDrawer = ({ open, toggle }) => {
  const [searchData, setSearchData] = useState([]);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const locateBySearch = async (placeid) => {
    const res = await fetch(
      `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeid}`
    );
    const { data } = await res.json();
    const city = data[0]?.address_components?.filter(
      (item) => item?.types[0] === "city"
    );
    dispatch(
      addLocation({
        lat: data[0]?.geometry?.location?.lat,
        long: data[0]?.geometry?.location?.lng,
        city: city[0]?.long_name,
        address: data[0]?.formatted_address,
      })
    );
    window.location.reload();
  };

  const handleSearch = useCallback(
    debounce(
      (searchQuery) => useSearchLocation(searchQuery, setSearchData),
      500
    ),
    []
  );

  let drawerClasses =
    "h-full w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed -translate-x-full left-0 top-0";
  let backdrop;
  if (open) {
    drawerClasses =
      "h-full w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed left-0 top-0 translate-x-0 shadow-[1px_0_7px_#00000080]";
    backdrop = (
      <div
        className="w-full h-full z-[1000] bg-[#282c3e99] fixed right-0 top-0"
        onClick={toggle}></div>
    );
    document?.body?.classList?.add("drawerOpenTwo");
  } else if (!open && document?.body?.classList?.contains("drawerOpenTwo")) {
    document?.body?.classList?.remove("drawerOpenTwo");
  }
  return (
    <>
      <div className={drawerClasses}>
        <div className="pl-40 pr-8 pt-8">
          <div className="cursor-pointer text-lg" onClick={toggle}>
            <BsXLg />
          </div>
          <div className="h-full pt-10">
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                className="border-[#d4d5d9] w-full border-[1px] flex-1 p-3.5 text-sm font-semibold text-defBlack outline-none focus:shadow-[0_1px_7px_1px_#d4d5d9]"
                placeholder="Search for area, street name.."
                id="locInput"
                name="locInput"
                maxLength="40"
                ref={searchRef}
                onChange={() => handleSearch(searchRef.current?.value)}
                autoFocus={true}
              />
              {searchData && (
                <div className="bg-white absolute w-full z-[10] top-[60px]">
                  {searchData?.map((item) => {
                    return (
                      <button
                        key={item?.place_id}
                        className="group text-left relative min-h-[40px] cursor-pointer text-[#535665] font-normal w-full flex"
                        onClick={() => locateBySearch(item?.place_id)}>
                        <span className="text-xl p-6 group-hover:text-defColor">
                          <GoLocation />
                        </span>
                        <span className="block py-6 w-full h-full group-hover:text-defColor font-medium text-sm overflow-hidden whitespace-nowrap text-ellipsis border-b-[#bebfc5] border-b border-dashed">
                          {item?.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </form>
            <button
              className="mt-4 p-6 border-[#d4d5d9] flex-col items-start w-full border-[1px] cursor-pointer flex gap-x-1 text-[#535665] group"
              onClick={() => useCurrentLocation(dispatch, addLocation)}>
              <span className="text-defBlack flex items-center text-base font-medium group-hover:text-defColor">
                <BiTargetLock className="text-xl mr-2" />
                Get current location
              </span>
              <span className="ml-7 text-sm ">Using GPS</span>
            </button>
          </div>
        </div>
      </div>
      {backdrop}
    </>
  );
};
export default LocationDrawer;
