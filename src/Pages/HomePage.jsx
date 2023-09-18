import { Link } from "react-router-dom";
import Carousel from "../Components/Carousel";
import DataCard from "../Components/DataCard";
import { useSelector, useDispatch } from "react-redux";
import { selectLocationState } from "../Utilities/AppSlice";
import {
  selectRestCards,
  selectHomeStatus,
  fetchMoreData,
  selectPageNum,
  updatePage,
  selectAvailStatus,
} from "../Utilities/HomePageSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector(selectLocationState);
  const restaurants = useSelector(selectRestCards);
  const status = useSelector(selectHomeStatus);
  const page = useSelector(selectPageNum);
  const serviceStatus = useSelector(selectAvailStatus);
  if (serviceStatus)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-start">
        <div className="">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
            className="h-64 w-56 mt-24"
          />
        </div>
        <div className="text-center pt-8">
          <div className="text-xl font-bold text-defBlack">
            Location Unserviceable
          </div>
          <div className="texl base font-normal text-defGray">
            We don’t have any services here till now. Try changing location.
          </div>
        </div>
      </div>
    );
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <Carousel />
      <div className="px-4">
        <h1 className="text-2xl text-black font-bold">
          {`Restaurants with online food delivery in ${userLocation?.city}`}
        </h1>
        <div className="grid grid-cols-[repeat(4,1fr)] gap-x-8 gap-y-4 my-8">
          {restaurants?.map((item) => {
            return (
              <Link to={"restaurant/" + item?.info?.id} key={item?.info?.id}>
                <DataCard item={item} />
              </Link>
            );
          })}
          {status === "loading" && (
            <>
              <div className="shine w-full h-[170px] rounded-2xl"></div>
              <div className="shine w-full h-[170px] rounded-2xl"></div>
              <div className="shine w-full h-[170px] rounded-2xl"></div>
              <div className="shine w-full h-[170px] rounded-2xl"></div>
            </>
          )}
        </div>
        <div className="flex justify-center my-10">
          {page <= 150 && (
            <button
              className="w-max text-center rounded px-6 font-bold text-md h-8 border-2 border-defBlack hover:border-defColor hover:text-defColor"
              onClick={() => {
                dispatch(updatePage());
                dispatch(
                  fetchMoreData({
                    lat: userLocation?.lat,
                    long: userLocation?.long,
                    page: page,
                  })
                );
              }}>
              Load More Restaurants
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
