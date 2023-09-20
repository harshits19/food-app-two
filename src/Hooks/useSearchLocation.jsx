import { ADDRESS_SUGG_URL } from "../Utilities/Constants";

const useSearchLocation = async (searchQuery, setSearchData) => {
  try {
    if (searchQuery !== "" && searchQuery?.length > 2)
      fetch(`${ADDRESS_SUGG_URL}${searchQuery}`)
        .then((data) => data.json())
        .then((data) => {
          setSearchData(data?.data);
        });
    else if (searchQuery === "") setSearchData([]);
  } catch (err) {
    console.log(err);
  }
};

export default useSearchLocation;
