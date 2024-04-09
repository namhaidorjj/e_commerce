/** @format */

import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { jwtDecode } from "jwt-decode";
import { instance } from "@/utils/instance";
import Cookies from "js-cookie";
import { CartProps, User, Orders } from "@/utils/types/bagType";

export const Cart: React.FC<CartProps> = () => {
  const [orderData, setOrderData] = useState<Orders[]>([]);
  const [orderCount, setOrderCount] = useState<number>(0);
  let order = orderData.length;
  const totalPrice = useMemo(() => {
    return orderData.reduce((acc, order) => acc + (order.bagId.price || 0), 0);
  }, [orderData]);

  const fetchProducts = async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        const response = await instance.post("/order", {
          userId: decoded.id,
        });
        setOrderData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (colorId: string) => {
    try {
      const response = await instance.delete("/deleteOrder", {
        data: { colorId },
      });
      alert("Success delete");
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setOrderCount(order);
    fetchProducts();
  }, [orderData]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex gap-1 justify-center items-center">
          <img className="w-4 h-4" src="/assets/icons/basket.svg" alt="" />
          <p className="bg-black w-[15px] mb-3 rounded-xl text-white flex text-xs h-[15px] items-center justify-center">
            {orderCount}
          </p>
        </button>
      </SheetTrigger>
      <SheetContent className="lg:min-w-[800px] w-full bg-white">
        <SheetHeader>
          <SheetTitle> MY ORDER</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {orderData.map((bag: any, bagIndex: any) => (
          <div tabIndex={bagIndex} className="flex gap-4 py-4">
            <img
              className="w-1/3 rounded-xl cursor-pointer"
              src={bag.colors[0].images?.[1]}
            />
            <div className="flex flex-col justify-start w-1/2">
              <h1 className="font-bold text-lg text-black">{bag?.bagName}</h1>
              <div className="flex justify-between items-center">
                <div className="flex w-auto pt-4 pb-2">
                  <p>Bag Code:</p>&nbsp;
                  <p>{bag.colors[0].bagCode || `982373`}</p>
                </div>
                <img
                  onClick={() => handleDelete(bag.colors[0].colorId)}
                  className="w-5 h-5"
                  src="/assets/icons/delete.svg"
                />
              </div>
              <div className="flex w-auto pt-4 pb-2 items-center gap-2">
                <p>Bag Color:</p>&nbsp;
                <p>{bag.colors[0].color || `black`}</p>
                <div
                  style={{ background: bag.colors[0].adminColor }}
                  className="border border-spacing-1 w-4 h-4 rounded-full"
                />
              </div>
              <hr />
              <div className="flex w-auto justify-between pt-2">
                <p>Bag Price:</p>
                <p>{bag.bagId.price || `10`}₮</p>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <div className="flex w-auto justify-end pr-10 pt-2">
          <p>TOTAL :</p>&nbsp;
          <p>{totalPrice}₮</p>
        </div>
        <SheetClose asChild>
          <a href="./orderCard">
            <button
              type="submit"
              className="w-full rounded-lg btn items-center justify-center border border-spacing-1 bg-zinc-800 p-1 text-white">
              Bought bag
            </button>
          </a>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
