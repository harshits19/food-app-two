import { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import useCurrentLocation from "../Hooks/useCurrentLocation";
import useSearchLocation from "../Hooks/useSearchLocation";
import { addLocation } from "../Utilities/AppSlice";
import { BsXLg } from "react-icons/bs";
import { BiTargetLock } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
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
      `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeid}`,
    );
    const { data } = await res.json();
    const city = data[0]?.address_components?.filter(
      (item) => item?.types[0] === "city",
    );
    dispatch(
      addLocation({
        lat: data[0]?.geometry?.location?.lat,
        long: data[0]?.geometry?.location?.lng,
        city: city[0]?.long_name,
        address: data[0]?.formatted_address,
      }),
    );
    window.location.reload();
  };

  const handleSearch = useCallback(
    debounce(
      (searchQuery) => useSearchLocation(searchQuery, setSearchData),
      500,
    ),
    [],
  );

  let drawerClasses =
    "h-full w-full lg:w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed -translate-x-full left-0 top-0";
  let backdrop;
  if (open) {
    drawerClasses =
      "h-full w-full lg:w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed left-0 top-0 translate-x-0 shadow-[1px_0_7px_#00000080]";
    backdrop = (
      <div
        className="fixed right-0 top-0 z-[1000] h-full w-full bg-[#282c3e99]"
        onClick={toggle}
      ></div>
    );
    document?.body?.classList?.add("drawerOpenTwo");
  } else if (!open && document?.body?.classList?.contains("drawerOpenTwo")) {
    document?.body?.classList?.remove("drawerOpenTwo");
  }
  return (
    <>
      <div className={drawerClasses}>
        <div className="pl-8 pr-8 pt-8 lg:pl-40">
          <div className="inline-block cursor-pointer text-lg">
            <BsXLg onClick={toggle} />
          </div>
          <div className="h-full pt-10">
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                className="w-full flex-1 border-[1px] border-[#d4d5d9] p-3.5 text-sm font-semibold text-defBlack outline-none focus:shadow-[0_1px_7px_1px_#d4d5d9]"
                placeholder="Search for area, street name.."
                id="locInput"
                name="locInput"
                maxLength="40"
                ref={searchRef}
                onChange={() => handleSearch(searchRef.current?.value)}
                autoFocus={true}
              />
              {searchData && (
                <div className="absolute top-[60px] z-[10] w-full bg-white">
                  {searchData?.map((item) => {
                    return (
                      <button
                        key={item?.place_id}
                        className="group relative flex min-h-[40px] w-full cursor-pointer text-left font-normal text-[#535665]"
                        onClick={() => locateBySearch(item?.place_id)}
                      >
                        <span className="p-6 text-xl group-hover:text-defColor">
                          <GoLocation />
                        </span>
                        <span className="block h-full w-full overflow-hidden text-ellipsis whitespace-nowrap border-b border-dashed border-b-[#bebfc5] py-6 text-sm font-medium group-hover:text-defColor">
                          {item?.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </form>
            <button
              className="group mt-4 flex w-full cursor-pointer flex-col items-start gap-x-1 border-[1px] border-[#d4d5d9] p-6 text-[#535665]"
              onClick={() => useCurrentLocation(dispatch, addLocation)}
            >
              <span className="flex items-center text-base font-medium text-defBlack group-hover:text-defColor">
                <BiTargetLock className="mr-2 text-xl" />
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
