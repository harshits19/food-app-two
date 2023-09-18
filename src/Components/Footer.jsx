const Footer = () => {
  return (
    <div
      className="z-[900] bg-black min-h-[298px] w-full text-white overflow-hidden relative px-5 py-0"
      id="footered">
      <div className="relative w-[1200px] flex flex-col h-full mx-auto my-0 pt-[76px]">
        <div className="flex justify-between pb-5 border-b-[#4d4d4d] border-b border-solid">
          <div className="max-w-[300px]">
            <h3>Company</h3>
            <ul className="list-none mt-[30px] mb-0 mx-0 p-0 text-sm">
              <li className="mt-[15px]">About us</li>
              <li className="mt-[15px]">Team</li>
              <li className="mt-[15px]">Careers</li>
            </ul>
          </div>
          <div className="max-w-[300px]">
            <h3>Contact</h3>
            <ul className="list-none mt-[30px] mb-0 mx-0 p-0 text-sm">
              <li className="mt-[15px]">Help &amp; Support</li>
              <li className="mt-[15px]">Partner with Us</li>
              <li className="mt-[15px]">Ride with Us</li>
            </ul>
          </div>
          <div className="max-w-[300px]">
            <h3>Legal</h3>
            <ul className="list-none mt-[30px] mb-0 mx-0 p-0 text-sm">
              <li className="mt-[15px]">Terms and Conditions</li>
              <li className="mt-[15px]">Refund and Cancellation</li>
              <li className="mt-[15px]">Privacy Policy</li>
              <li className="mt-[15px]">Cookie Policy</li>
              <li className="mt-[15px]">Offer Terms</li>
            </ul>
          </div>
          <div className="w-[200px]">
            <a
              href="#"
              target="_blank"
              className="block will-change-transform mb-[30px] scale-x-100">
              <img
                alt=""
                src="https://foodsimp.netlify.app/appStoreIcon.be7d6e09.png"
              />
            </a>
            <a
              href="#"
              target="_blank"
              className="block will-change-transform mb-[30px] scale-x-100">
              <img
                alt=""
                src="https://foodsimp.netlify.app/playStoreIcon.8412b4d9.png"
              />
            </a>
          </div>
        </div>
        <div className="flex grow items-center px-0 py-4">
          <div className="w-[142px] fill-white">
            <img
              width="142"
              alt=""
              src="https://foodsimp.netlify.app/logoFooter.b9007afe.png"
            />
          </div>
          <div className="text-center text-xl tracking-[-0.6px] grow">
            © 2023 FoodSimp
          </div>
          <div className="w-[180px]"></div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
