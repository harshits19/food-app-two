import { SEARCH_REST_URL } from "../Utilities/Constants";
const useFetchSearchData = async (
  searchText,
  userLocation,
  setAllRestaurants,
) => {
  fetch(
    `${SEARCH_REST_URL}lat=${userLocation?.lat}&lng=${userLocation?.long}&str=${searchText}`,
  )
    .then((res) => res.json())
    .then((data) => setAllRestaurants(data?.data?.suggestions))
    .catch((err) => console.log(err));
};
export default useFetchSearchData;
