import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLocationState } from "../Utilities/AppSlice";
import {
  DefLogo,
  SearchBtn,
  ProfileBtn,
  CartBtn,
  OfferBtn,
  AboutBtn,
} from "../Assets/SVG";
import { BiChevronDown } from "react-icons/bi";
const Header = (props) => {
  const location = useSelector(selectLocationState);
  return (
    <div
      className="h-20 w-full px-5 sticky top-0 z-50 bg-white shadow-[0_15px_40px_-20px_#282c3f26]"
      id="header">
      <div className="flex justify-between h-full items-center max-w-[1200px] mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <DefLogo classList={"h-[49px] w-[34px] fill-defColor"} />
          </Link>
          <div
            className="tracking-tighter flex gap-x-2 ml-8 cursor-pointer group"
            onClick={props.toggle}>
            <span className="font-bold text-sm text-defBlack group-hover:text-defColor">
              {location.city}
            </span>
            <span className="text-defGray max-w-[14rem] textEllipse text-ellipsis overflow-hidden w-full break-words">
              {location?.address}
            </span>
            <span className="text-defColor text-2xl">
              <BiChevronDown />
            </span>
          </div>
        </div>
        <ul className="flex gap-x-14 h-full items-center text-primary font-semibold">
          <Link to="search">
            <li className="flex items-center group gap-x-3">
              <SearchBtn
                classList={
                  "h-[17px] w-[17px] fill-primary group-hover:fill-defColor"
                }
              />
              <span className="group-hover:text-defColor ">Search</span>
            </li>
          </Link>
          <Link to="offers">
            <li className="flex items-center group gap-x-3">
              <OfferBtn
                classList={
                  "h-[19px] w-[19px] fill-primary group-hover:fill-defColor"
                }
              />
              <span className="group-hover:text-defColor ">Offers </span>
            </li>
          </Link>
          <Link to="about">
            <li className="flex items-center group gap-x-3">
              <AboutBtn
                classList={
                  "h-[19px] w-[19px] fill-primary group-hover:fill-defColor"
                }
              />
              <span className="group-hover:text-defColor ">About</span>
            </li>
          </Link>
          <Link to="#" onClick={props.toggleTwo}>
            <li className="flex items-center group gap-x-3">
              <ProfileBtn
                classList={
                  "h-[19px] w-[18px] fill-primary group-hover:fill-defColor"
                }
              />
              <span className="group-hover:text-defColor ">Login </span>
            </li>
          </Link>
          <Link to="cart">
            <li className="flex items-center group gap-x-3">
              <span className="relative">
                <CartBtn
                  classList={
                    "h-[20px] w-[20px] fill-white stroke-primary stroke-[3px] group-hover:stroke-defColor"
                  }
                />
                <span className="text-sm font-semibold absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 group-hover:text-defColor">
                  1
                </span>
              </span>
              <span className="group-hover:text-defColor">Cart</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Header;
