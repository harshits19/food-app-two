import { BsXLg } from "react-icons/bs";
import { LOGIN_ICON_URL } from "../Utilities/Constants";

const SigninDrawer = ({ openTwo, toggleTwo }) => {
  let drawerClasses =
    "h-full w-full lg:w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed translate-x-full right-0 top-0";
  let backdrop;
  if (openTwo) {
    drawerClasses =
      "h-full w-full lg:w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed right-0 top-0 overflow-y-scroll translate-x-0 shadow-[1px_0_7px_#00000080]";
    backdrop = (
      <div
        className="fixed right-0 top-0 z-[1000] h-full w-full bg-[#282c3e99]"
        onClick={toggleTwo}
      ></div>
    );
    document?.body?.classList?.add("drawerOpen");
  } else if (!openTwo && document?.body?.classList?.contains("drawerOpen")) {
    document?.body?.classList?.remove("drawerOpen");
  }
  return (
    <>
      <div className={drawerClasses}>
        <div className="pl-8 pr-10 pt-8 lg:pr-40">
          <div className="inline-block cursor-pointer text-lg">
            <BsXLg onClick={toggleTwo} />
          </div>
          <div className="drawerLoginHead">
            <div className="loginHeading">Login</div>
            <div className="loginDesc">or create an account</div>
            <div className="loginBorder"></div>
            <img className="loginIcon" src={LOGIN_ICON_URL} />
          </div>
          <div className="drawerLoginBody">
            <div className="drawerLoginInput">
              <input
                className="phoneInput"
                type="tel"
                name="mobile"
                maxLength="10"
                placeholder="Phone number"
              ></input>
            </div>
            <div className="checkoutBtn">Login</div>
            <div className="policySection">
              By clicking on Login, I accept the
              <a>Terms & Conditions</a> & <a>Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
      {backdrop}
    </>
  );
};
export default SigninDrawer;
