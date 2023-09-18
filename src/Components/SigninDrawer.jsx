import { BsXLg } from "react-icons/bs";

const SigninDrawer = ({ openTwo, toggleTwo }) => {
  let drawerClasses =
    "h-full w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed translate-x-full right-0 top-0";
  let backdrop;
  if (openTwo) {
    drawerClasses =
      "h-full w-[562px] z-[1001] bg-white transition-transform duration-[0.3s] ease-[ease-out] fixed right-0 top-0 overflow-y-scroll translate-x-0 shadow-[1px_0_7px_#00000080]";
    backdrop = (
      <div
        className="w-full h-full z-[1000] bg-[#282c3e99] fixed right-0 top-0"
        onClick={toggleTwo}></div>
    );
    document?.body?.classList?.add("drawerOpen");
  } else if (!openTwo && document?.body?.classList?.contains("drawerOpen")) {
    document?.body?.classList?.remove("drawerOpen");
  }
  return (
    <>
      <div className={drawerClasses}>
        <div className="pr-40 pl-8 pt-8">
          <div className="cursor-pointer text-lg" onClick={toggleTwo}>
            <BsXLg />
          </div>
        </div>
      </div>
      {backdrop}
    </>
  );
};
export default SigninDrawer;
