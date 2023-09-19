import { useEffect } from "react";

const RestaurantMenuNav = ({ data, open, toggle }) => {
  let menuNavClasses = "menu-drawer";
  let backdrop;
  if (open) {
    menuNavClasses = "menu-drawer open";
    backdrop = <div className="backdrop" onClick={toggle}></div>;
    document.body?.classList?.add("menuOpen");
  } else if (!open && document.body?.classList?.contains("menuOpen")) {
    document.body?.classList?.remove("menuOpen");
  }
  var allRestaurants = [];
  data?.map((items) => {
    const obj = {
      title: items.card.card.title,
      qty:
        items?.card?.card?.itemCards?.length ||
        items?.card?.card?.categories?.length,
    };
    allRestaurants.push(obj);
  });
  allRestaurants = allRestaurants.filter((x) => x.title !== undefined);

  return (
    <>
      <div className={menuNavClasses + " !w-full sm:!w-[500px]"}>
        <div className="menuNavContainer" id="menuNavContainer">
          {allRestaurants.map((restaurant) => {
            return (
              <div
                className="menuNavItems"
                key={restaurant.title}
                onClick={toggle}
              >
                <span
                  className={restaurant.title}
                  onClick={() =>
                    document.getElementById(restaurant.title).scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  {restaurant.title}
                </span>
                <span>{restaurant.qty}</span>
              </div>
            );
          })}
        </div>
      </div>
      {backdrop}
    </>
  );
};
export default RestaurantMenuNav;
