/** @format */

import React from "react";
import { ConsumerOrder } from "../components/ConsumerOrder";

export const OrderNav = () => {
  return (
    <div className="bg-stone-200 h-screen w-screen text-stone-500">
      <div>
        <ul className="flex gap-1 w-screen text-base font-normal border-b border-gray-300 pt-4 px-4 h-[56px] fixed z-10 bg-stone-200">
          <li className="text-center w-[64px] hover:font-medium hover:border-b-2 hover:border-black duration-300 cursor-pointer active:scale-95">
            Бүгд
          </li>
          <li className="text-center w-[140px] hover:font-medium hover:border-b-2 hover:border-black duration-300 cursor-pointer">
            Шинэ захиалага
          </li>
          <li className="text-center w-[153px] hover:font-medium hover:border-b-2 hover:border-black duration-300 cursor-pointer">
            Бэлтгэгдэж байна
          </li>
          <li className="text-center w-[158px] hover:font-medium hover:border-b-2 hover:border-black duration-300 cursor-pointer">
            Хүргэлтэнд гарсан
          </li>
          <li className="text-center w-[108px] hover:font-medium hover:border-b-2 hover:border-black duration-300 cursor-pointer">
            Хүргэгдсэн
          </li>
          <li className="text-center w-[112px] hover:font-medium hover:border-b-2 hover:border-black duration-300 cursor-pointer">
            Цуцлагдсан
          </li>
        </ul>
      </div>
      <div className="mt-[70px] px-8">
        <ConsumerOrder />
      </div>
    </div>
  );
};
