const Footer = () => {
  return (
    <div
      className="relative z-[10] w-full overflow-hidden bg-black px-5 py-0 text-white sm:min-h-[300px]"
      id="footered"
    >
      <div className="relative mx-auto my-0 flex h-full max-w-[1200px] flex-col pt-6 sm:pt-[76px]">
        <div className="hidden justify-between border-b border-solid border-b-[#4d4d4d] pb-5 sm:flex">
          <div className="max-w-[300px]">
            <h3>Company</h3>
            <ul className="mx-0 mb-0 mt-[30px] list-none p-0 text-sm">
              <li className="mt-[15px]">About us</li>
              <li className="mt-[15px]">Team</li>
              <li className="mt-[15px]">Careers</li>
            </ul>
          </div>
          <div className="max-w-[300px]">
            <h3>Contact</h3>
            <ul className="mx-0 mb-0 mt-[30px] list-none p-0 text-sm">
              <li className="mt-[15px]">Help &amp; Support</li>
              <li className="mt-[15px]">Partner with Us</li>
              <li className="mt-[15px]">Ride with Us</li>
            </ul>
          </div>
          <div className="max-w-[300px]">
            <h3>Legal</h3>
            <ul className="mx-0 mb-0 mt-[30px] list-none p-0 text-sm">
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
              className="mb-[30px] block scale-x-100 will-change-transform"
            >
              <img
                alt=""
                src="https://foodsimp.netlify.app/appStoreIcon.be7d6e09.png"
              />
            </a>
            <a
              href="#"
              target="_blank"
              className="mb-[30px] block scale-x-100 will-change-transform"
            >
              <img
                alt=""
                src="https://foodsimp.netlify.app/playStoreIcon.8412b4d9.png"
              />
            </a>
          </div>
        </div>
        <div className="flex grow flex-col items-center gap-y-2 px-0 py-4 sm:flex-row">
          <div className="w-[142px] fill-white">
            <img
              className="w-[130px] sm:w-[182px]"
              src="https://foodsimp.netlify.app/logoFooter.b9007afe.png"
            />
          </div>
          <div className="grow text-center text-xl tracking-[-0.6px]">
            © 2023 FoodSimp
          </div>
          <div className="w-[180px]"></div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
