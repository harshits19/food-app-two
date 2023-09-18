import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ItemBox from "./ItemBox";

const Accordion = ({ data, isVeg, restInfo }) => {
  const [isAVisible, setIsAVisible] = useState(true);
  const calcLength = data?.itemCards
    ? data?.itemCards?.filter(
        (data) =>
          isVeg || data?.card?.info?.itemAttribute?.vegClassifier === "VEG"
      )?.length
    : data?.categories?.length;
  return (
    <div
      className="menuAccordion px-0 py-4 scroll-mt-20 border-b-[16px] border-b-[#f1f1f6]"
      id={data?.title}>
      <div
        className="text-[#3e4152] cursor-pointer w-full justify-between items-center text-base font-bold leading-[1.2] transition-all duration-[0.2s] flex"
        onClick={() => {
          isAVisible ? setIsAVisible(false) : setIsAVisible(true);
        }}>
        {data?.title + " " + "(" + calcLength + ")"}
        <button className="text-2xl">
          {isAVisible ? <BiChevronDown /> : <BiChevronUp />}
        </button>
      </div>
      {isAVisible && (
        <div className="itemBody">
          {data?.itemCards
            ? data?.itemCards
                ?.filter(
                  (data) =>
                    isVeg ||
                    data?.card?.info?.itemAttribute?.vegClassifier === "VEG"
                )
                .map((data, idx) => {
                  return (
                    <ItemBox data={data?.card} key={idx} restInfo={restInfo} />
                  );
                })
            : data?.categories?.map((data, idx) => {
                return (
                  <Accordion
                    data={data}
                    key={idx}
                    isVeg={isVeg}
                    restInfo={restInfo}
                  />
                );
              })}
        </div>
      )}
    </div>
  );
};
export default Accordion;
