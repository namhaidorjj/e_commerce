/** @format */

import React from "react";
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

type Variant = "outline";

interface CartProps {
  variant: Variant;
}

export const Cart: React.FC<CartProps> = ({ variant }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex gap-1 justify-center items-center ">
          <img className="w-4 h-4" src="assets/icons/basket.svg" alt="" />
          <p className="bg-black w-[15px] mb-3 rounded-xl text-white flex text-xs h-[15px] items-center justify-center">
            0
          </p>
        </button>
      </SheetTrigger>
      <SheetContent className="lg:min-w-[800px] w-full">
        <SheetHeader>
          <SheetTitle> MY ORDER</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col py-4">
          <div className="flex w-auto items-center gap-4 pb-5">
            <img
              className="rounded-md max-h-52 w-1/3"
              src="./assets/testTsvnh.avif"
              alt=""
            />
            <div className="flex flex-col justify-start w-1/2">
              <h1 className=" font-bold text-lg text-black">Bag name</h1>
              <div className="flex w-auto pt-4 pb-2">
                <p>Bag Code:</p>&nbsp; <p>982373</p>
              </div>
              <div className="flex w-auto pt-4 pb-2 items-center gap-2">
                <p>Bag Color:</p>&nbsp; <p>black</p>
                <div className="border border-spacing-1 w-4 h-4 rounded-full bg-black" />
              </div>
              <hr />
              <div className="flex w-auto justify-between pt-2">
                <p>Bag Price:</p>
                <p>10₮</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex w-auto justify-end pr-10 pt-2">
            <p>TOTAL :</p>&nbsp;
            <p>2500₮</p>
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
