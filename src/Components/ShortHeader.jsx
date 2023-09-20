import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItem } from "../Utilities/CartSlice";
import { selectLocationState } from "../Utilities/AppSlice";
import { priceItemCalculator } from "../Hooks/useMisc";
import { DefLogo, SearchBtn, ProfileBtn, CartBtn } from "../Assets/SVG";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";

const ShortHeader = ({ toggle, toggleTwo }) => {
  const location = useSelector(selectLocationState);
  const cartItems = useSelector(selectCartItem);
  let { totalItems } = priceItemCalculator(cartItems);

  return (
    <>
      <header
        className="sticky top-0 z-20 block h-full w-full border-b border-[#e9e9eb] bg-white shadow-[0_15px_40px_-20px_#282c3f26] md:hidden"
        id="shortHeader"
      >
        <div className="flex h-full items-center justify-between px-4 py-2">
          <div className="flex flex-col" onClick={toggle}>
            <div className="flex items-center text-xl font-bold text-defBlack group-hover:text-defColor">
              <MdOutlineLocationOn className="mr-1 text-2xl" />
              <span>{location?.city}</span>
            </div>
            <div className="flex items-center">
              <span className="textEllipse w-full overflow-hidden text-ellipsis break-words text-defGray">
                {location?.address}
              </span>
              <BiChevronDown className="mr-4 text-2xl text-defColor" />
            </div>
          </div>
          <NavLink to="/">
            <DefLogo classList={"h-10 w-8 fill-defColor"} />
          </NavLink>
        </div>
      </header>
      <footer
        className="fixed bottom-0 left-0 z-20 block w-full border-t border-[#e9e9eb] bg-white md:hidden"
        id="mobileNav"
      >
        <div className="relative flex flex-row justify-evenly bg-white text-xs font-medium uppercase text-defGray">
          <NavLink to="/" className="w-full py-2">
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center gap-y-[1px] ${
                  isActive ? "text-defBlack" : "text-defGray"
                }`}
              >
                <DefLogo
                  classList={`h-5 w-5 ${
                    isActive ? "fill-defBlack" : "fill-defGray"
                  }`}
                />
                Home
              </div>
            )}
          </NavLink>
          <NavLink to="/search" className="w-full py-2">
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center gap-y-[1px]  ${
                  isActive ? "text-defBlack" : "text-defGray"
                }`}
              >
                <SearchBtn
                  classList={`h-5 w-5 ${
                    isActive ? "fill-defBlack" : "fill-defGray"
                  }`}
                />
                Search
              </div>
            )}
          </NavLink>
          <NavLink to="/cart" className="w-full py-2">
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center gap-y-[1px]  ${
                  isActive ? "text-defBlack" : "text-defGray"
                }`}
              >
                <span className="relative">
                  <CartBtn
                    classList={`h-5 w-5 stroke-[3px] fill-white ${
                      isActive ? "stroke-defBlack" : "stroke-defGray"
                    }`}
                  />
                  <span
                    className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-sm font-semibold "
                    id="cartCounter"
                  >
                    {totalItems}
                  </span>
                </span>
                <span>Cart</span>
              </div>
            )}
          </NavLink>
          <NavLink onClick={toggleTwo} className="group w-full py-2">
            <div className="flex flex-col items-center gap-y-[1px] group-hover:text-defBlack">
              <ProfileBtn
                classList={"h-5 w-5 fill-defGray group-hover:fill-defBlack"}
              />
              Signin
            </div>
          </NavLink>
        </div>
      </footer>
    </>
  );
};
export default ShortHeader;
