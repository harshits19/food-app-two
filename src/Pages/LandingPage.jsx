import { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { BiTargetLock } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { FullLogo } from "../Assets/SVG";
import { addLocation } from "../Utilities/AppSlice";
import useSearchLocation from "../Hooks/useSearchLocation";
import useCurrentLocation from "../Hooks/useCurrentLocation";
import Footer from "../Components/Footer";
import { FETCH_ADDRESS_URL, LP_IMG_SET } from "../Utilities/Constants";

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

  const fetchAddressBySearch = async (placeid) => {
    const res = await fetch(`${FETCH_ADDRESS_URL}${placeid}`);
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

  return (
    <div>
      <section className="relative flex w-full">
        <div className="h-full w-full md:h-[540px] md:w-[80%] lg:w-[70%] xl:w-[55%]">
          <div className="ml-4 p-8 md:ml-8 md:p-12 lg:ml-16 lg:p-16 xl:ml-24">
            <FullLogo classList={"w-[200px] h-full fill-defColor"} />
            <div className="-mt-4">
              <h1 className="text-4xl font-bold text-defBlack">
                Late Night at Office?
              </h1>
              <h2 className="font-base mt-2 text-2xl text-[#686b78]">
                Order food from favourite restaurants near you.
              </h2>
              <div className="relative mt-8 md:h-[60px]">
                <form
                  className="flex h-full flex-col md:flex-row"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label
                    htmlFor="locInput"
                    className="relative flex h-full flex-1"
                  >
                    <input
                      className="flex-1 border-[1px] border-[#bebfc5] px-4 py-2.5 text-lg font-semibold text-defBlack outline-none focus:border-defColor focus:shadow-[0_1px_10px_0_rgba(40,44,63,0.1)] md:border-r-0 md:px-4 md:py-0"
                      placeholder="Enter your delivery location"
                      id="locInput"
                      name="locInput"
                      maxLength="40"
                      ref={searchRef}
                      onChange={() => handleSearch(searchRef.current?.value)}
                    ></input>
                    <button
                      className="absolute right-0 top-[1px] mr-2 flex cursor-pointer items-center gap-x-1 bg-white px-2.5 py-3 font-medium text-[#535665] hover:bg-[#e9e9eb] md:top-2"
                      onClick={() => useCurrentLocation(dispatch, addLocation)}
                    >
                      <BiTargetLock />
                      Locate Me
                    </button>
                  </label>
                  <button className="mt-2 h-full bg-defColor px-8 py-3 text-sm font-extrabold text-white  md:mt-0 md:py-0">
                    FIND FOOD
                  </button>
                </form>
                {searchData && (
                  <div className="absolute top-[48px] z-[10] w-full  border border-t-0 border-solid border-[#d4d5d9] bg-white shadow-[0_1px_10px_0_rgba(40,44,63,0.1)] md:top-[60px]">
                    {searchData?.map((item) => {
                      return (
                        <button
                          key={item?.place_id}
                          className="group relative flex min-h-[40px] w-full cursor-pointer text-left font-normal text-[#535665]"
                          onClick={() => fetchAddressBySearch(item?.place_id)}
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
              </div>
              <div className="mt-8 ">
                <h2 className="font-medium text-[#a9abb2]">
                  POPULAR CITIES IN INDIA
                </h2>
                <div className="mt-4 flex flex-wrap gap-x-2 text-sm font-bold text-defGray ">
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
        <div className="w-0 bg-[url('https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq')] bg-cover bg-[100%] bg-no-repeat md:w-[20%] lg:w-[30%] xl:w-[45%]"></div>
      </section>
      <section className="flex h-full w-full flex-col justify-evenly bg-[#2b1e16] px-16 pb-16 text-white md:flex-row">
        <div className="text-center">
          <div className="flex h-full justify-center md:h-[250px]">
            <img className="h-[200px]" src={LP_IMG_SET[0]} />
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
          <div className="flex h-full justify-center md:h-[250px]">
            <img className="h-[200px]" src={LP_IMG_SET[1]} />
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
          <div className="flex h-full justify-center md:h-[250px]">
            <img className="h-[200px]" src={LP_IMG_SET[2]} />
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
