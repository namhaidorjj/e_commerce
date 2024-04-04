/** @format */
import React from "react";
import { BrandsCard } from "./BrandsCard";
import { Footer } from "./Footer";

export const HomeSection = () => {
  return (
    <div className=" bg-[#FFFBEE]">
      <div className=" flex justify-center ">
        <div className="w-screen h-screen relative">
          <img
            className="w-full h-full flex justify-center items-center object-cover"
            src="assets/hop.jpg"
            alt=""
          />
        </div>
        <div className=" absolute flex justify-center text-white h-[64px] p-5 font-bold items-center gap-20">
          <div className=" hover:cursor-pointer">
            <p className=" font-mono text-base">HAND BAG</p>
          </div>
          <div className=" hover:cursor-pointer">
            <p className=" font-mono text-base">BACK PACK</p>
          </div>
          <div className=" hover:cursor-pointer">
            <p className=" font-mono text-base">ACCESSORY BAG</p>
          </div>
          <div className=" hover:cursor-pointer">
            <p className=" font-mono text-base">TRAVEL BAG</p>
          </div>
        </div>
      </div>
      <BrandsCard />
      <div className="bg-[#FFFBEE] p-32 flex flex-col items-center justify-center gap-20">
        <p className="text-5xl ">Why To Buy From Us</p>
        <div className=" flex gap-52 ">
          <div className=" flex flex-col gap-3 justify-center items-center ">
            <img
              className=" w-[60px] h-[60px]"
              src="assets/icons/shipping.svg"
              alt=""
            />
            <p> Free Shipping</p>
          </div>
          <div className=" flex flex-col gap-3 justify-center items-center ">
            <img
              className=" w-[60px] h-[60px]"
              src="assets/icons/card.svg"
              alt=""
            />
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className=" flex flex-col gap-3 justify-center items-center ">
            <img
              className=" w-[60px] h-[60px]"
              src="assets/icons/clipboard.svg"
              alt=""
            />
            <p>Lorem ipsum dolor sit.</p>
          </div>
          <div className=" flex flex-col gap-3 justify-center items-center ">
            <img
              className=" w-[60px] h-[60px]"
              src="assets/icons/support.svg"
              alt=""
            />
            <p>Lorem, ipsum.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
