import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItem } from "../Utilities/CartSlice";
import { selectLocationState } from "../Utilities/AppSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DefLogo,
  SearchBtn,
  ProfileBtn,
  CartBtn,
  OfferBtn,
  AboutBtn,
} from "../Assets/SVG";

const ShortHeader = ({ toggle, toggleTwo }) => {
  const location = useSelector(selectLocationState);
  const cartItems = useSelector(selectCartItem);

  let totalItems = 0;
  cartItems.map((item) => {
    totalItems += item?.qty;
  });
  const handleNavList = () => {
    var navs = document.getElementById("shortNav");
    navs.classList.toggle("shortNavActive");
  };
  return (
    <header className="sticky top-0 z-20 block h-full w-full border-b border-[#e9e9eb] bg-white shadow-[0_15px_40px_-20px_#282c3f26] md:hidden">
      <div className="flex flex-col">
        <div className="flex h-full items-center justify-between px-4 py-2">
          <Link to="/">
            <DefLogo classList={"h-10 w-8 fill-defColor"} />
          </Link>
          <span>
            <GiHamburgerMenu
              className="text-3xl text-defBlack"
              onClick={handleNavList}
            />
          </span>
        </div>
        <div
          className="relative z-20 h-0 w-full overflow-hidden bg-white text-[1.125rem] font-medium text-primary  transition-[height] duration-[0.4s] ease-[ease]"
          id="shortNav"
        >
          <Link to="/search" onClick={handleNavList}>
            <div className="flex items-center gap-x-2 border-b border-t border-[#e9e9eb] px-5 py-2.5">
              <SearchBtn
                classList={"h-5 w-5 mr-2 fill-defBlack hover:fill-defColor"}
              />
              Search
            </div>
          </Link>
          <Link to="/offers" onClick={handleNavList}>
            <div className="flex items-center gap-x-2 border-b border-[#e9e9eb] px-5 py-2.5">
              <OfferBtn
                classList={"h-5 w-5 mr-2 fill-defBlack hover:fill-defColor"}
              />
              Offers
            </div>
          </Link>
          <Link to="/about" onClick={handleNavList}>
            <div className="flex items-center gap-x-2 border-b border-[#e9e9eb] px-5 py-2.5">
              <AboutBtn
                classList={"h-5 w-5 mr-2 fill-defBlack hover:fill-defColor"}
              />
              About
            </div>
          </Link>
          <Link onClick={toggleTwo}>
            <div className="flex items-center gap-x-2 border-b border-[#e9e9eb] px-5 py-2.5">
              <ProfileBtn
                classList={"h-5 w-5 mr-2 fill-defBlack hover:fill-defColor"}
              />
              Signin
            </div>
          </Link>
          <Link to="/cart" onClick={handleNavList}>
            <div className="flex items-center gap-x-2 border-b border-[#e9e9eb] px-5 py-2.5">
              <span className="relative">
                <CartBtn
                  classList={
                    "h-5 w-5 stroke-primary stroke-[3px] fill-white hover:stroke-defColor"
                  }
                />
                <span
                  className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-sm font-semibold group-hover:text-defColor"
                  id="cartCounter"
                >
                  {totalItems}
                </span>
              </span>
              <span className="ml-2">Cart</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default ShortHeader;
