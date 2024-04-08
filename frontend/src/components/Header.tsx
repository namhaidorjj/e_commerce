/** @format */
import { useMemo, useState } from "react";
import { ContactUsBar } from "./ContactUsSheet";
import { useRouter } from "next/router";
import { LoginSheet } from "./LoginSheet";
import { Cart } from "./Cart";

export default function Header() {
  const router = useRouter();
  const [mainWord, setMainWord] = useState("");
  const changeMainWord = useMemo(() => {
    if (router.asPath === "/gucci") {
      setMainWord("gucci");
    }
    if (router.asPath === "/prada") {
      setMainWord("prada");
    }
    if (router.asPath === "/hermes") {
      setMainWord("hermes");
    }
    if (router.asPath === "/LouisVuitton") {
      setMainWord("louis vuitton");
    }
  }, [router.asPath]);
  return (
    <div className="w-full flex flex-col h-full">
      <div className="justify-between lg:h-[90px] h-[64px] flex w-full items-center">
        <div className="pl-5 gap-5 lg:pl-20">
          <button className="flex items-center gap-2">
            <img className="w-4 h-4" src="/assets/icons/search.svg" alt="" />
            <p className="text-[#000000] text-xs">Search</p>
          </button>
        </div>
        <div className="uppercase justify-center text-xl lg:text-4xl ">
          {mainWord}
        </div>
        <div className="pr-5 flex gap-[30px] h-[50px] lg:pr-20">
          <ContactUsBar variant="outline" />
          <button className="text-[#000000] text-xs hidden lg:flex lg:items-center">
            Wishlist
          </button>
          <LoginSheet variant="outline" />
          <Cart variant="outline" />
        </div>
      </div>
    </div>
  );
}
