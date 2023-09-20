import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RestaurantMenuNav from "./RestaurantMenuNav";
import { selectCartItem } from "../Utilities/CartSlice";
import { RiShoppingBag3Line } from "react-icons/ri";
import { ImSpoonKnife } from "react-icons/im";
import { priceItemCalculator } from "../Hooks/useMisc";

const RestaurantBottomSection = ({ data }) => {
  const cartItems = useSelector(selectCartItem);
  let { totalCost, totalItems } = priceItemCalculator(cartItems);
  var cartBottomMenu = document.getElementById("stickyBottomMenu");
  var restMenuBtnContainer = document.getElementById("restMenuBtnContainer");
  if (cartItems.length > 0) {
    cartBottomMenu?.classList?.add("stickyBottomMenuVisible");
    restMenuBtnContainer?.classList?.add("restMenuVisible");
  } else if (
    cartBottomMenu?.classList?.contains("stickyBottomMenuVisible") &&
    cartItems.length == 0
  ) {
    cartBottomMenu?.classList?.remove("stickyBottomMenuVisible");
    restMenuBtnContainer?.classList?.remove("restMenuVisible");
  }

  const [menuNavState, setMenuNavState] = useState(false);
  const menuNavToggleClickHandler = () => {
    setMenuNavState(!menuNavState);
  };
  return (
    <div>
      <div className="stickyBottomMenuContainer ">
        <div className="restMenuBtnInnerContainer" id="restMenuBtnContainer">
          <div className="restMenuBtnContainer">
            <div
              className="restMenuBtn"
              onClick={() => menuNavToggleClickHandler()}
            >
              <ImSpoonKnife className="mr-1 text-xs text-white" />
              Browse Menu
            </div>
          </div>
        </div>
        <div className="stickyBottomMenu" id="stickyBottomMenu">
          <Link to="/cart/">
            <button className="stickyMenuStyleContainer">
              <span className="stickyMenuInnerBody">
                {totalItems +
                  (totalItems > 1 ? " Items" : " Item") +
                  " | ₹" +
                  totalCost / 100}
                <span className="bottomMenuRight">
                  view cart
                  <RiShoppingBag3Line className="text-white" />
                </span>
              </span>
            </button>
          </Link>
        </div>
      </div>
      <RestaurantMenuNav
        open={menuNavState}
        toggle={menuNavToggleClickHandler}
        data={data}
      />
    </div>
  );
};
export default RestaurantBottomSection;
