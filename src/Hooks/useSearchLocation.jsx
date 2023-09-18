const useSearchLocation = async (searchQuery, setSearchData) => {
  try {
    if (searchQuery !== "" && searchQuery?.length > 2)
      fetch(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchQuery}&types=`
      )
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
