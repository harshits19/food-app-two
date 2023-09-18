import { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { BiTargetLock } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { FullLogo } from "../Assets/SVG";
import { addLocation } from "../Utilities/AppSlice";
import useSearchLocation from "../Hooks/useSearchLocation";
import useCurrentLocation from "../Hooks/useCurrentLocation";
import Footer from "../Components/Footer";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const LandingPage = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [searchData, setSearchData] = useState([]);

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

  return (
    <div>
      <section className="w-full flex relative">
        <div className="h-[540px] w-[55%]">
          <div className="p-16 ml-24">
            <FullLogo classList={"w-[200px] fill-defColor"} />
            <div className="-mt-16">
              <h1 className="text-4xl font-bold text-defBlack">
                Late Night at Office?
              </h1>
              <h2 className="mt-2 text-2xl font-base text-[#686b78]">
                Order food from favourite restaurants near you.
              </h2>
              <div className="h-[60px] mt-8 relative">
                <form
                  className="h-full flex"
                  onSubmit={(e) => e.preventDefault()}>
                  <label
                    htmlFor="locInput"
                    className="relative h-full flex flex-1">
                    <input
                      className="border-[#bebfc5] border-l-[1px] border-b-[1px] border-t-[1px] flex-1 px-4 text-lg font-semibold text-defBlack outline-none focus:border-defColor focus:shadow-[0_1px_10px_0_rgba(40,44,63,0.1)]"
                      placeholder="Enter your delivery location"
                      id="locInput"
                      name="locInput"
                      maxLength="40"
                      ref={searchRef}
                      onChange={() =>
                        handleSearch(searchRef.current?.value)
                      }></input>
                    <button
                      className="absolute font-medium cursor-pointer px-2.5 py-3 right-0 top-2 flex items-center gap-x-1 text-[#535665] hover:bg-[#e9e9eb] mr-2"
                      onClick={() => useCurrentLocation(dispatch, addLocation)}>
                      <BiTargetLock />
                      Locate Me
                    </button>
                  </label>
                  <button className="bg-defColor text-white px-8 h-full  font-extrabold text-sm">
                    FIND FOOD
                  </button>
                </form>
                {searchData && (
                  <div className="bg-white absolute w-full  border shadow-[0_1px_10px_0_rgba(40,44,63,0.1)] z-[10] border-t-0 border-solid border-[#d4d5d9] top-[60px]">
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
              </div>
              <div className="mt-8 ">
                <h2 className="text-[#a9abb2] font-medium">
                  POPULAR CITIES IN INDIA
                </h2>
                <div className="flex flex-wrap gap-x-2 mt-4 font-bold text-sm text-defGray ">
                  <span>Ahmedabad</span>
                  <span>Bangalore</span>
                  <span>Chennai</span>
                  <span>Delhi</span>
                  <span>Gurgaon</span>
                  <span>Hyderabad</span>
                  <span>Kolkata</span>
                  <span>Mumbai</span>
                  <span>Pune</span>
                  <span>& more.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[45%] bg-no-repeat bg-cover bg-[100%] bg-[url('https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq')]"></div>
      </section>
      <section className="w-full h-full bg-[#2b1e16] flex justify-evenly text-white pb-16 px-16">
        <div className="text-center">
          <div className="flex h-[250px] justify-center">
            <img
              className="h-[200px]"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf"
            />
          </div>
          <h2 className="text-xl font-semibold">No Minimum Order</h2>
          <p className="mt-2 text-sm text-[#e0cbc1]">
            Order in for yourself or for the group,
          </p>
          <p className="text-sm text-[#e0cbc1]">
            with no restrictions on order value
          </p>
        </div>
        <div className="text-center">
          <div className="flex h-[250px] justify-center">
            <img
              className="h-[200px]"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy"
            />
          </div>
          <h2 className="text-xl font-semibold">Live Order Tracking</h2>
          <p className="mt-2 text-sm text-[#e0cbc1]">
            Know where your order is at all times,
          </p>
          <p className="text-sm text-[#e0cbc1]">
            from the restaurant to your doorstep
          </p>
        </div>
        <div className="text-center">
          <div className="flex h-[250px] justify-center">
            <img
              className="h-[200px]"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn"
            />
          </div>
          <h2 className="text-xl font-semibold">Lightning-Fast Delivery</h2>
          <p className="mt-2 text-sm text-[#e0cbc1]">
            Experience Swiggy's superfast delivery
          </p>
          <p className="text-sm text-[#e0cbc1]">
            for food delivered fresh & on time
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default LandingPage;
