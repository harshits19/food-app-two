import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ItemBox from "./ItemBox";
import { filterItems } from "../Hooks/useMisc";
import { SlMagnifier } from "react-icons/sl";
import { BsArrowLeft, BsXLg } from "react-icons/bs";

const RestaurantSearch = () => {
  const { state } = useLocation();
  const inputRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const unfilteredData = filterItems(state[0]);
  useEffect(() => {
    inputRef.current.focus();
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches)
      document.getElementById("shortHeader").style.display = "none";
    return () => {
      if (mediaQuery.matches)
        document.getElementById("shortHeader").style.display = "block";
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = searchData(searchText, unfilteredData);
      setFilteredRestaurants(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const searchData = (searchQuery, rawData) => {
    let filterData = rawData.filter((restaurant) =>
      restaurant?.info?.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (searchQuery == "") filterData = [];
    return filterData;
  };
  return (
    <div className="mx-auto my-5 flex min-h-[800px] max-w-[800px] flex-col px-4">
      <form
        className="h-19 mb-4 flex w-full items-center border-b border-[#e9e9eb] pb-1"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Link to={"/restaurant/" + state[1]?.resId}>
          <BsArrowLeft className="h-8 w-6 fill-[#3d4152]" />
        </Link>
        <input
          className="h-full w-full border-none bg-white px-5 py-2.5 text-base font-light outline-none "
          placeholder={`Search in ${state[1]?.name}`}
          ref={inputRef}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button className="cursor-pointer border-white bg-white px-3">
          {!isSearched ? (
            <SlMagnifier className="text-xl text-[#686b78]" />
          ) : (
            <BsXLg className="text-xl text-[#686b78]" />
          )}
        </button>
      </form>
      <div className="h-full w-full pb-8">
        {filteredRestaurants?.map((item, idx) => {
          return <ItemBox data={item} restInfo={state[1]} key={idx} />;
        })}
      </div>
    </div>
  );
};
export default RestaurantSearch;
