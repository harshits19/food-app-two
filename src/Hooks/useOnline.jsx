import { useEffect, useState } from "react";
const useOnline = () => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    //if user is not online (then isOnline is false)
    document
      .getElementById("errorPopupContainer")
      .classList.add("errorPopupShow");
  } else {
    if (
      document
        ?.getElementById("errorPopupContainer")
        ?.classList.contains("errorPopupShow")
    )
      document
        ?.getElementById("errorPopupContainer")
        ?.classList.remove("errorPopupShow");
  }

  return (
    <div className="errorPopupContainer" id="errorPopupContainer">
      <div className="errorPopupBox">
        <div className="errorPopupInner">
          <div className="errorPopup">
            <div className="errorPopupHeader">Connection Error</div>
            <div className="errorPopupDesc">
              Please check your internet connection and try again.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default useOnline;
