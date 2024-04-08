/** @format */

import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { instance } from "@/utils/instance";
import Cookies from "js-cookie";

export const Cart = ({ variant }) => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const { query } = useRouter();
  // const totalPrice = useMemo(() => {
  //   // return orderData.reduce(
  //   //   (acc, bag) => acc + (orderData.bagId.price || 0),
  //   //   0
  //   // );
  // }, [orderData]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const token = Cookies.get("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded) {
            const response = await instance.post("/order", {
              userId: decoded.id,
            });
            setOrderData(response.data.data);
          } else {
            alert("Invalid or expired token");
          }
        } catch (error) {
          console.error(error);
          alert(
            "Failed to decode token or fetch bag data. Please try again later."
          );
        } finally {
          setLoading(false);
        }
      } else {
        alert("Access token not found");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query.id]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex gap-1 justify-center items-center">
          <img className="w-4 h-4" src="../assets/icons/basket.svg" alt="" />
          <p className="bg-black w-[15px] mb-3 rounded-xl text-white flex text-xs h-[15px] items-center justify-center">
            {orderData.length}
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
        <div className="overflow-y-scroll">
          {orderData.map((bag: any, bagIndex: any) => (
            <div tabIndex={bagIndex} className="flex gap-4 py-4">
              <img
                className="w-1/3 rounded-xl cursor-pointer"
                src={bag.colors[0].images?.[1]}
              />
              <div className="flex flex-col justify-start w-1/2">
                <h1 className="font-bold text-lg text-black">{bag?.bagName}</h1>
                <div className="flex w-auto pt-4 pb-2">
                  <p>Bag Code:</p>&nbsp;
                  <p>{bag.colors[0].bagCode || `982373`}</p>
                </div>
                <div className="flex w-auto pt-4 pb-2 items-center gap-2">
                  <p>Bag Color:</p>&nbsp;
                  <p>{bag.colors[0].color || `black`}</p>
                  <div className="border border-spacing-1 w-4 h-4 rounded-full bg-black" />
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
            <p>{"2500"}₮</p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <button
              className="btn rounded-lg w-full items-center justify-center border border-spacing-1 bg-zinc-800 p-1 text-white"
              type="submit">
              Bought bag
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
