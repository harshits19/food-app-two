import { Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import RestaurantPage from "./Pages/RestaurantPage";
import SearchPage from "./Pages/SearchPage";
import CartPage from "./Pages/CartPage";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import store from "./Utilities/store";
import { useSelector } from "react-redux";
import { selectLocationState } from "./Utilities/AppSlice";
import { fetchData } from "./Utilities/HomePageSlice";
import RestaurantSearch from "./Components/RestaurantSearch";

function App() {
  const userLocation = useSelector(selectLocationState);
  store.dispatch(
    fetchData({ lat: userLocation?.lat, long: userLocation?.long }),
  );
  return (
    <Routes>
      {userLocation ? (
        <Route path="/" element={<Body />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="restaurant">
            <Route index path=":resId" element={<RestaurantPage />} />
            <Route path=":resId/search" element={<RestaurantSearch />} />
          </Route>
          <Route path="search" element={<SearchPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      ) : (
        <Route index path="/" element={<LandingPage />} />
      )}
    </Routes>
  );
}
export default App;
