import { useState, useEffect, useMemo } from "react";
import SearchCard from "../Components/SearchCards";
import useFetchSearchData from "../Hooks/useFetchSearchData";
import useTitle from "../Hooks/useTitle";
import { SlMagnifier } from "react-icons/sl";
import { BsXLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectLocationState } from "../Utilities/AppSlice";
import { DEF_IMG_URL, SEARCH_SHIMMER_SET } from "../Utilities/Constants";

const SearchPage = () => {
  const userLocation = useSelector(selectLocationState);
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length > 1)
        useFetchSearchData(searchText, userLocation, setAllRestaurants);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const preSearchShimmer = useMemo(
    () =>
      SEARCH_SHIMMER_SET?.map((imageId) => {
        return (
          <img
            className="h-[100px] w-[85px]"
            src={DEF_IMG_URL + imageId}
            key={imageId}
          />
        );
      }),
    [searchText],
  );
  useTitle("Search for restaurants");
  return (
    <>
      <div className="w-full px-4 mx-auto">
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
              className="px-3 bg-white border-white cursor-pointer"
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
            <div className="relative w-full mx-auto">
              <div className="block">
                <div className="p-5 text-xl font-bold">Popular Cuisines</div>
                <div className="flex px-5 overflow-x-auto cursor-pointer searchBody w-ful gap-x-4">
                  {preSearchShimmer}
                </div>
              </div>
            </div>
          ) : allRestaurants.length > 0 ? (
            <SearchCard data={allRestaurants} />
          ) : (
            searchText?.length > 2 && (
              <div className="pt-4 text-xl font-bold text-center text-defBlack">
                No items match your search query
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default SearchPage;
