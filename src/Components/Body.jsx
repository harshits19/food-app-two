import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LocationDrawer from "./LocationDrawer";
import SigninDrawer from "./SigninDrawer";
import ShortHeader from "./ShortHeader";

const Body = () => {
  const [locationDrawer, setLocationDrawer] = useState(false);
  const [signinDrawer, setSigninDrawer] = useState(false);
  const toggleOne = useCallback(() => {
    setLocationDrawer(!locationDrawer);
  }, [locationDrawer]);
  const toggleTwo = useCallback(() => {
    setSigninDrawer(!signinDrawer);
  }, [signinDrawer]);
  return (
    <>
      <Header toggle={toggleOne} toggleTwo={toggleTwo} />
      <ShortHeader toggle={toggleOne} toggleTwo={toggleTwo} />
      <LocationDrawer open={locationDrawer} toggle={toggleOne} />
      <SigninDrawer openTwo={signinDrawer} toggleTwo={toggleTwo} />
      <Outlet />
      <Footer />
    </>
  );
};
export default Body;
