import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItem,
  selectRestInfo,
  addItem,
  removeItem,
} from "../Utilities/CartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItem);
  const restDetails = useSelector(selectRestInfo);
  let totalCost = 0,
    totalItems = 0;

  cartItems.map((item) => {
    totalCost +=
      (item?.price
        ? item?.price
        : item?.finalPrice
        ? item?.finalPrice
        : item?.defaultPrice) * item?.qty;
    totalItems += item?.qty;
  });
  function myFunction() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("hiddenText");
    if (checkBox.checked == true) {
      text.innerText =
        "Our delivery partner will call to confirm. Please ensure that your address has all the required details.";
    } else {
      text.innerText =
        " Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)";
    }
  }

  return (
    <div>
      <div className="cartContainer">
        {cartItems?.length === 0 ? (
          <div className="cartInnerContainer">
            <div className="cartBGImage"></div>
            <div className="cartMsg">Your cart is empty</div>
            <div className="cartDesc">
              You can go to home page to view more restaurants
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="goHomeBtn">restaurants near you</div>
            </Link>
          </div>
        ) : (
          <div className="cartFilled">
            <div className="checkOutSection">
              <Link
                to={"/restaurant/" + restDetails?.resId}
                style={{ textDecoration: "none" }}
              >
                <button className="cartRestroDetails">
                  <span className="cartRestroImgBox">
                    <img
                      className="cartRestroImg h-[50px] w-[50px]"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                        restDetails?.dp
                      }
                    />
                  </span>
                  <span className="cartRestroDesc">
                    <div className="cartRestroName">{restDetails?.name}</div>
                    <div className="cartRestroArea">
                      {restDetails?.areaName}
                    </div>
                  </span>
                </button>
              </Link>
              <div className="cartItemContainer">
                <div className="cartInnerItemContainer">
                  <div className="cartItemSection">
                    <div>
                      {cartItems?.map((item) => {
                        return (
                          <div className="cartItems" key={item?.id}>
                            <div className="cartItemInner">
                              <div className="cartItemName">
                                {item?.isVeg ? (
                                  <img
                                    className="h-5 w-5"
                                    src="https://foodsimp.netlify.app/vegFoodIcon.47b449ec.png"
                                  />
                                ) : (
                                  <img
                                    className="h-5 w-5"
                                    src="https://foodsimp.netlify.app/nonVegFoodIcon.7b3936e7.png"
                                  />
                                )}
                                <div>{item?.name}</div>
                              </div>
                              <div className="cartItemRateSection">
                                <div className="cartQuantityBtn">
                                  {item?.qty == 0 ? (
                                    <div
                                      className="addBtn cartItemBtn"
                                      onClick={() =>
                                        dispatch(addItem(item, restDetails))
                                      }
                                    >
                                      ADD
                                    </div>
                                  ) : (
                                    <div className="itemCounter cartItemBtn">
                                      <span
                                        className="itemInnerBtn minusItemBtn"
                                        onClick={() =>
                                          dispatch(removeItem(item))
                                        }
                                      >
                                        -
                                      </span>
                                      {item?.qty}
                                      <span
                                        className="itemInnerBtn plusItemBtn "
                                        onClick={() =>
                                          dispatch(addItem(item, restDetails))
                                        }
                                      >
                                        +
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="cartItemPrice">
                                  {"₹"}
                                  {(item.price
                                    ? item.price
                                    : item.finalPrice
                                    ? item.finalPrice
                                    : item.defaultPrice) / 100}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="beforeCheckContainer">
                  <div className="beforeCheckInner">
                    <div className="beforeCheckBox">
                      <input
                        type="checkbox"
                        className="checkBoxInput"
                        id="myCheck"
                        onClick={() => myFunction()}
                      />
                    </div>
                    <div aria-hidden="true" className="checkBoxBody">
                      <div className="checkBoxInnerHeader">
                        Opt in for No-contact Delivery
                      </div>
                      <div className="checkBoxInnerBody" id="hiddenText">
                        Unwell, or avoiding contact? Please select no-contact
                        delivery. Partner will safely place the order outside
                        your door (not for COD)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cartCostSection">
                  <div className="billDetails">Bill Details</div>
                  <div className="costnDelSection">
                    <div className="">Item Total</div>
                    <div>{totalCost / 100}</div>
                  </div>
                  <div className="costnDelSection">
                    <div className="">
                      Delivery Fee | {restDetails?.distance}
                    </div>
                    <div>
                      {"₹"}
                      {restDetails?.delFees / 100}
                    </div>
                  </div>
                  <div className="otherCharges"></div>

                  <div className="costnDelSection">
                    <div className="">Govt Taxes & Other Charges</div>
                    <div>
                      {"₹"}
                      {restDetails?.delFees / 200}
                    </div>
                  </div>
                </div>
              </div>

              <div className="totalPayoutSec">
                <div className="totalPayoutInner">
                  <div>TO PAY</div>
                  <div>
                    {"₹"}
                    {Math.round((totalCost + restDetails?.delFees * 1.5) / 100)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartPage;
