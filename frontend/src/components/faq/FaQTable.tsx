/** @format */

import React from "react";
import { CiDeliveryTruck, CiGift, CiBoxes } from "react-icons/ci";
import { MdCurrencyExchange } from "react-icons/md";
import { IoBagOutline, IoInformationCircleOutline } from "react-icons/io5";
import { GrServices } from "react-icons/gr";

export const FaQTable = () => {
  return (
    <div className="grid grid-cols-3 text-[14px]">
      <div className="h-[120px] flex flex-col items-center justify-center border gap-2">
        <IoInformationCircleOutline size={35} />
        <button>Corporate information</button>
      </div>
      <div className="h-[120px] flex flex-col items-center justify-center border gap-2">
        <MdCurrencyExchange size={30} />
        <button>Exchange & Returns</button>
      </div>
      <div className="h-[120px] flex flex-col items-center justify-center border gap-2">
        <CiGift size={35} />
        <button>Gifting</button>
      </div>
      <div className="h-[120px] flex flex-col items-center justify-center border gap-2">
        <CiBoxes size={35} />
        <button>Orders</button>
      </div>
      <div className="h-[120px] flex flex-col items-center justify-center border gap-2">
        <IoBagOutline size={35} />
        <button>Products</button>
      </div>
      <div className="h-[120px] flex flex-col items-center justify-center border gap-2">
        <GrServices size={35} />
        <button>Services</button>
      </div>
      <div className="h-[120px] flex flex-col items-center justify-center border-[2px] border-t-[1px]">
        <CiDeliveryTruck size={35} />
        <button>Delivery</button>
      </div>
    </div>
  );
};
