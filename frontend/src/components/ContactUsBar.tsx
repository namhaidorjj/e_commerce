/** @format */

export const ContactUsBar = () => {
  return (
    <div className="">
      <div className="absolute  w-full h-full bg-black opacity-70 top-0 left-0"></div>
      <div className="absolute h-full w-1/2 bg-white flex-col right-0 top-0 flex">
        <div className="pt-[64px] pl-[150px] flex flex-col gap-10">
          <div className="flex justify-between pr-[150px]">
            <p>Call Us</p>
            <button>
              <img className="text-xs" src="assets/icons/close.svg" alt="" />
            </button>
          </div>
          <p className="text-xs">
            Wherever you are, Louis Vuitton Client Advisors will be delighted to
            assist you.
          </p>
          <div className="flex gap-3">
            <img src="assets/icons/phone.svg" alt="" />
            <button>+1.866.VUITTON</button>
          </div>
          <div className="flex gap-3">
            <img src="assets/icons/mail.svg" alt="" />
            <button className="text-xs">Send an Email</button>
          </div>
          <p>Need Help?</p>
        </div>
        <div className="flex flex-col items-start pl-[150px] gap-10 pt-10">
          <a href="/faq" className="text-xs">
            FAQ
          </a>
          <button className="text-xs">Care Services</button>
          <button className="text-xs">Find a Store</button>
        </div>
      </div>
    </div>
  );
};
