import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../Components/Carousel";
import DataCard from "../Components/DataCard";
import { selectLocationState } from "../Utilities/AppSlice";
import {
  selectRestCards,
  selectHomeStatus,
  fetchMoreData,
  selectPageNum,
  updatePage,
  selectAvailStatus,
} from "../Utilities/HomePageSlice";
import { UNAVAIL_LOC_URL } from "../Utilities/Constants";

const HomePage = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector(selectLocationState);
  const restaurants = useSelector(selectRestCards);
  const status = useSelector(selectHomeStatus);
  const page = useSelector(selectPageNum);
  const serviceStatus = useSelector(selectAvailStatus);
  if (serviceStatus)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-start">
        <div className="">
          <img src={UNAVAIL_LOC_URL} className="mt-24 h-64 w-56" />
        </div>
        <div className="pt-8 text-center">
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
    <div className="mx-auto w-full max-w-[1200px]">
      <Carousel />
      <div className="px-4">
        <h1 className="text-2xl font-bold text-black">
          {`Restaurants with online food delivery in ${userLocation?.city}`}
        </h1>
        <div className="my-8 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-x-8 gap-y-4 md:grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(4,1fr)]">
          {restaurants?.map((item) => {
            return (
              <Link to={"restaurant/" + item?.info?.id} key={item?.info?.id}>
                <DataCard item={item} />
              </Link>
            );
          })}
          {status === "loading" && (
            <>
              <div className="shine h-[120px] w-full rounded-2xl md:h-[170px]"></div>
              <div className="shine h-[120px] w-full rounded-2xl md:h-[170px]"></div>
              <div className="shine h-[120px] w-full rounded-2xl md:h-[170px]"></div>
              <div className="shine h-[120px] w-full rounded-2xl md:h-[170px]"></div>
            </>
          )}
        </div>
        <div className="my-10 flex justify-center">
          {page <= 150 && (
            <button
              className="text-md h-8 w-max rounded border-2 border-defBlack px-6 text-center font-bold hover:border-defColor hover:text-defColor"
              onClick={() => {
                dispatch(updatePage());
                dispatch(
                  fetchMoreData({
                    lat: userLocation?.lat,
                    long: userLocation?.long,
                    page: page,
                  }),
                );
              }}
            >
              Load More Restaurants
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
