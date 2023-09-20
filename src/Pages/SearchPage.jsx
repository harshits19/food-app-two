import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import useTitle from "../Hooks/useTitle";
import { SlMagnifier } from "react-icons/sl";
import { BsXLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectLocationState } from "../Utilities/AppSlice";

const SearchCard = ({ data }) => {
  let resId = "";
  return (
    <div>
      {data?.map((restaurants) => {
        let url = JSON.parse(restaurants?.metadata)?.data?.primaryRestaurantId;
        if (url) resId = `/restaurant/${url}`;
        return (
          <Link to={resId} key={restaurants?.metadata}>
            <div className="flex h-full w-full items-center gap-x-2 rounded p-2 hover:bg-gray-100 ">
              <div className="h-16 w-16">
                <img
                  className="h-full w-full rounded-md"
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                    restaurants?.cloudinaryId
                  }
                />
              </div>
              <div className="text-sm text-defBlack no-underline">
                <p>{restaurants?.text}</p>
                <p className="text-xs text-[#7e808c]">
                  {restaurants?.tagToDisplay}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const SearchPage = () => {
  const userLocation = useSelector(selectLocationState);
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const searchData = [
    "rng/md/carousel/production/b4ff78ecc5b8b66f732dd06228916d65",
    "rng/md/carousel/production/3df4fca020027e89b89c733cdffc4966",
    "rng/md/carousel/production/5dd234f7decdac4b4f71a2ff1408e10f",
    "rng/md/carousel/production/87664acb0f9dd95d10a549bb8190ab27",
    "rng/md/carousel/production/e76b511935016406e6ebc11dd7593387",
    "rng/md/carousel/production/89f3fec702aef5acbb51a6cbc284b3f7",
    "rng/md/carousel/production/8322f6d6df488dc1f5a6674cfe863f0f",
    "rng/md/carousel/production/31f03222ea978aef3b10d386729eb076",
    "rng/md/carousel/production/c170aa4262ec0d191642f42a3a03b4ce",
    "rng/md/carousel/production/0b5ffa32a04d99c1f212d2aacefd5f6f",
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length > 1) fetchRestaurantsAPI(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchRestaurantsAPI = async (searchText) => {
    fetch(
      `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${userLocation?.lat}&lng=${userLocation?.long}&str=${searchText}`,
    )
      .then((res) => res.json())
      .then((data) => setAllRestaurants(data?.data?.suggestions))
      .catch((err) => console.log(err));
  };
  const preSearchShimmer = useMemo(
    () =>
      searchData.map((imageId) => {
        return (
          <img
            className="h-[100px] w-[85px]"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
              imageId
            }
            key={imageId}
          />
        );
      }),
    [searchText],
  );
  useTitle("Search for restaurants");
  return (
    <>
      <div className="mx-auto w-full px-4">
        <div className="sticky top-[68px] z-10 h-20 w-full bg-white pb-5 pt-5 md:top-20 md:h-28 md:pt-[50px]">
          <div className="mx-auto flex h-12 max-w-[800px] overflow-hidden rounded-[3px] border-[1px] border-[#282c3f4d]">
            <input
              className="h-full  w-full border-none bg-white px-5 py-2.5 text-sm font-medium outline-none "
              placeholder="Search for restaurants and food"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                e.target.value === ""
                  ? setIsSearched(false)
                  : setIsSearched(true);
              }}
            />
            <button
              className="cursor-pointer border-white bg-white px-3"
              onClick={() => {
                setIsSearched(false);
                setSearchText("");
              }}
            >
              {!isSearched ? (
                <SlMagnifier className="text-xl text-[#686b78]" />
              ) : (
                <BsXLg className="text-xl text-[#686b78]" />
              )}
            </button>
          </div>
        </div>
        <div className="mx-auto h-full min-h-[100vh] w-full max-w-[800px] pb-8">
          {!isSearched ? (
            <div className="relative mx-auto w-full">
              <div className="block">
                <div className="p-5 text-xl font-bold">Popular Cuisines</div>
                <div className="searchBody w-ful flex cursor-pointer gap-x-4 overflow-x-auto px-5">
                  {preSearchShimmer}
                </div>
              </div>
            </div>
          ) : allRestaurants.length > 0 ? (
            <SearchCard data={allRestaurants} />
          ) : (
            <div className="pt-4 text-center text-xl font-bold text-defBlack">
              No items match your search query
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SearchPage;
