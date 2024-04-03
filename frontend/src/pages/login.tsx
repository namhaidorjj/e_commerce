/** @format */

import { useRouter } from "next/router";
import React from "react";

export default function login() {
  return (
    <div className="w-full h-full">
      <img className="absolute w-full h-full" src="./new.jpg" alt="" />
      <div className="w-1/3 pt-10 left-10 pl-36 text-white h-min-screen absolute">
        <div>
          <p>BagHouse</p>
        </div>
        <div className="pt-52">
          <p className="text-2xl pb-2 font-bold">SHOP</p>
          <div className="flex flex-col gap-2">
            <div className=" flex  gap-2">
              <p>Brands</p>
            </div>
            <div className="opacity-60 flex flex-col gap-2">
              <p>Hermes</p>
              <p>Gucci</p>
              <p>Prada</p>
              <p>LouisVuitton</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-10 gap-14 flex flex-col right-0 text-white absolute h-full opacity-80 bg-amber-600">
        <div className="flex justify-end w-full">
          <button className="flex items-center justify-center border rounded-xl w-[40px] h-[40px]">
            <img className="fill-white	" src="assets/icons/close.svg" alt="" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-bold text-[20px]">EXISTING MEMBER </p>
          <p className="text-xs text-[17px]">Welcome Back!</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img className="w-4 h-4" src="assets/icons/loginMail.svg" alt="" />
            <input
              type="text"
              placeholder="Enter Email"
              className="bg-amber-600"
            />
          </div>
          <div className=" border-dashed border-b border-white"></div>
          <div className="flex items-center gap-3">
            <img className="w-4 h-4" src="assets/icons/lock.svg" alt="" />
            <input
              type="password"
              placeholder="Enter Password"
              className="bg-amber-600"
            />
          </div>
          <div className=" border-dashed border-b border-white"></div>
        </div>
        <div className="w-full h-full justify-center items-center flex fexl-col">
          <div className="flex text-black w-[300px]  items-center justify-between pl-4 pr-4 rounded-3xl bg-white h-[50px]">
            <button className="font-semibold">Continue</button>
            <img src="assets/icons/rightArrowBlack.svg" alt="" />
          </div>
        </div>

        <div className="flex  items-center w-full pl-10 pr-10 gap-1 h-full justify-center">
          <p className="border-b w-full"></p>
          <p>OR</p>
          <p className="border-b w-full"></p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button className="flex items-center justify-center w-[40px] h-[40px] border rounded-full">
            <img className="w-5 h-5" src="assets/icons/google.svg" alt="" />
            {/* <GoogleOAuthProvider clientId="<your_client_id>"></GoogleOAuthProvider> */}
          </button>
          <button className="flex items-center justify-center w-[40px] h-[40px] border rounded-full">
            <img className="w-5 h-5" src="assets/icons/facebook.svg" alt="" />
          </button>
          <button className="flex items-center justify-center w-[40px] h-[40px] border rounded-full">
            <img className="w-5 h-5" src="assets/icons/apple.svg" alt="" />
          </button>
        </div>
        <div className="flex gap-1 justify-center">
          <p className="font-light">Didn't have account?</p>
          <button>
            <p className="text.bold border-b">Register Now</p>
          </button>
        </div>
      </div>
    </div>
  );
}
