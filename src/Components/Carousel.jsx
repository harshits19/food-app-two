import { useSelector } from "react-redux";
import {
  selectCarouselData,
  selectCarouselStatus,
} from "../Utilities/HomePageSlice";
const Carousel = () => {
  const { carouselCards, categoryCards } = useSelector(selectCarouselData);
  const status = useSelector(selectCarouselStatus);
  return (
    <div className="w-full mt-4 px-4">
      {status === "success" ? (
        carouselCards?.length > 0 && (
          <div className="mt-6">
            <div className="text-2xl text-black font-bold">
              Best offers for you
            </div>
            <div className="h-full mt-4 flex gap-x-4 overflow-x-auto carouselContainer">
              {carouselCards?.map((item) => {
                return (
                  <div className="contents cursor-pointer" key={item?.imageId}>
                    <img
                      className="w-[425px] h-[250px]"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/" +
                        item?.imageId
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <div className="mt-6">
          <div className="text-2xl text-black font-bold">
            Best offers for you
          </div>
          <div className="h-full mt-4 flex gap-x-4 overflow-x-auto carouselContainer">
            <div>
              <div className="w-[425px] h-[250px] shine rounded-2xl"></div>
            </div>
            <div>
              <div className="w-[425px] h-[250px] shine rounded-2xl"></div>
            </div>
            <div>
              <div className="w-[425px] h-[250px] shine rounded-2xl"></div>
            </div>
          </div>
        </div>
      )}
      {status === "success" ? (
        categoryCards?.length > 0 && (
          <div className="w-full mt-8">
            <div className="text-2xl text-black font-bold">
              What's on your mind?
            </div>
            <div className="h-full mt-2 flex gap-x-4 overflow-x-auto carouselContainer">
              {categoryCards?.map((item) => {
                return (
                  <div className="contents cursor-pointer" key={item?.imageId}>
                    <img
                      className="h-[180px] w-[144px]"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" +
                        item?.imageId
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <div className="w-full mt-8">
          <div className="text-2xl pb-4 text-black font-bold">
            What's on your mind?
          </div>
          <div className="h-full mt-2 flex gap-x-4 overflow-x-auto carouselContainer">
            <div className="cursor-pointer">
              <div className="h-[145px] w-[144px] shine rounded-full"></div>
            </div>
            <div className="cursor-pointer">
              <div className="h-[145px] w-[144px] shine rounded-full"></div>
            </div>
            <div className="cursor-pointer">
              <div className="h-[145px] w-[144px] shine rounded-full"></div>
            </div>
            <div className="cursor-pointer">
              <div className="h-[145px] w-[144px] shine rounded-full"></div>
            </div>
            <div className="cursor-pointer">
              <div className="h-[145px] w-[144px] shine rounded-full"></div>
            </div>
            <div className="cursor-pointer">
              <div className="h-[145px] w-[144px] shine rounded-full"></div>
            </div>
            <div className="cursor-pointer">
              <div className="h-[145px] w-[144px] shine rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      <hr className="border my-8 border-solid border-[#f0f0f5]" />
    </div>
  );
};
export default Carousel;
