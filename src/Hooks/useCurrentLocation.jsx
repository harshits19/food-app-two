const useCurrentLocation = (dispatch, addLocation) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const success = async (pos) => {
    const crd = pos.coords;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${crd.latitude}&lon=${crd.longitude}&format=json`
    );
    const data = await res.json();
    dispatch(
      addLocation({
        lat: crd.latitude,
        long: crd.longitude,
        city: data?.address?.city,
        address: data?.display_name,
      })
    );
    window?.location.reload();
  };
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  navigator.geolocation
    ? navigator?.geolocation?.getCurrentPosition(success, error, options)
    : alert("Unable to fetch your Location");
};
export default useCurrentLocation;
