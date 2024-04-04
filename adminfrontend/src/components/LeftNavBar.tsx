/** @format */

import React, { useState } from "react";
import Link from "next/link";

export const LeftNavBar = () => {
  const [navStyle, setnavStyle] = useState(
    "flex gap-[19px] w-[222px] py-[10px] px-4 cursor-pointer hover:bg-stone-200 hover:pl-5 duration-200 items-center"
  );
  return (
    <div>
      <div className="w-[222px] h-screen bg-white text-stone-500">
        <div className="fixed pt-6 z-10 bg-white h-screen">
          <ul className="flex flex-col">
            <Link href={"/dashboard"}>
              <div className={`${navStyle}`}>
                <i className="fa-solid fa-window-maximize"></i>
                <li className="text-base font-semibold">Хяналтын самбар</li>
              </div>
            </Link>
            <Link href={"/order"}>
              <div className={`${navStyle}`}>
                <i className="fa-solid fa-folder-tree"></i>
                <li className="text-base font-semibold">Захиалга</li>
              </div>
            </Link>
            <div className={`${navStyle}`}>
              <i className="fa-solid fa-money-check-dollar"></i>
              <li className="text-base font-semibold">Орлого</li>
            </div>
            <Link href={"/productnav"}>
              <div className={`${navStyle}`}>
                <i className="fa-solid fa-table-columns"></i>
                <li className="text-base font-semibold">Бүтээгдэхүүн</li>
              </div>
            </Link>
            <Link href={"/settings"}>
              <div className={`${navStyle}`}>
                <i className="fa-solid fa-gear"></i>
                <li className="text-base font-semibold">Тохиргоо</li>
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
