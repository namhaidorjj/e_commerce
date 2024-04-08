/** @format */
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartProps } from "@/utils/types/bagType";

export const ContactUsBar: React.FC<CartProps> = (): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-[#000000] text-xs">Call Us</button>
      </SheetTrigger>
      <SheetContent className="bg-[#aba8a8]">
        <div className="absolute h-full w-full bg-white pl-20 pr-20 flex flex-col right-0 top-0 ">
          <div className="pt-[64px]  flex flex-col gap-10">
            <div className="flex justify-between pr-[150px]">
              <p>Call Us</p>
            </div>
            <p className="text-xs">
              Wherever you are, Louis Vuitton Client Advisors will be delighted
              to assist you.
            </p>
            <div className="flex gap-3">
              <img src="/assets/icons/phone.svg" alt="" />
              <p>+1.866.VUITTON</p>
            </div>
            <div className="flex gap-3">
              <img src="/assets/icons/mail.svg" alt="" />
              <button className="text-xs">Send an Email</button>
            </div>
            <p className=" pt-80">Need Help?</p>
          </div>
          <div className="flex flex-col items-start  gap-10 pt-10">
            <a href="/faq" className="text-xs">
              FAQ
            </a>
            <button className="text-xs">Care Services</button>
            <button className="text-xs">Find a Store</button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
