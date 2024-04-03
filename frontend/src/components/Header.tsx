/** @format */

import React, { useContext, useEffect, useMemo, useState } from "react";
import { ContactUsBar } from "./ContactUsBar";
import { ContactVisiblityContext } from "../../contexts/ContactUs";
import { SearchVisiblityContext } from "../../contexts/SearchUs";
import { SearchUsBar } from "./SearchUsBar";
import { useRouter } from "next/router";
import { Cart } from "./Cart";

export default function Header() {
  const router = useRouter();
  const { isContactVisible, setIsContactVisible } = useContext(
    ContactVisiblityContext
  );

  const { isSearchVisible, setIsSearchVisible } = useContext(
    SearchVisiblityContext
  );
  const [mainWord, setMainWord] = useState("");

  const handleLoginPage = () => {
    router.push("/login  ");
  };
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
      <div className="justify-between h-[90px] flex w-full items-center">
        <div className="flex pl-20  gap-5">
          <button
            onClick={() => {
              setIsSearchVisible(true);
            }}
            className="flex items-center gap-2">
            <img className="w-4 h-4" src="assets/icons/search.svg" alt="" />
            <p className="text-[#000000] text-xs">Search</p>
          </button>
        </div>
        <div className=" uppercase justify-center text-4xl">{mainWord}</div>
        <div className="pr-20 flex gap-[30px] h-[50px]">
          <button
            onClick={() => {
              setIsContactVisible(true);
            }}
            className="text-[#000000] text-xs">
            Call Us
          </button>
          <button className="text-[#000000] text-xs">Wishlist</button>
          <button onClick={handleLoginPage}>
            <img className="h-4 w-4" src="assets/icons/profile.svg" alt="" />
          </button>
          <Cart variant="outline" />
        </div>
      </div>
      {isContactVisible && <ContactUsBar />}
      {isSearchVisible && <SearchUsBar />}
    </div>
  );
}
