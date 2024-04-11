/** @format */

import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Footer } from "../Footer";
import { Bag } from "@/utils/types/bagType";
import { instance } from "@/utils/instance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toastifySuccess } from "@/utils/alerts";
import { toastifyInfo } from "@/utils/alerts";

export const BagDetail = ({ bag }: { bag: Bag }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [decodedToken, setDecodedToken] = useState<any>(null);
  useEffect(() => {
    try {
      const token = Cookies.get("accessToken");
      if (token) {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  const handleChangeColor = (colorIndex: number) => {
    setSelectedColor(colorIndex);
  };

  const handleAddOrder = async () => {
    try {
      if (!decodedToken) {
        toastifyInfo("Login first");
      }
      const colorId = bag.colors[selectedColor]._id;
      const orderData = {
        bagId: bag._id,
        colorId: colorId,
        userId: decodedToken.id,
      };
      console.log("first");
      const res = await instance.post("/addOrder", orderData);
      if (res.status === 201) return toastifySuccess("amjilttai sagsand nemle");
      if (res.status === 403) toastifyInfo("sagsand nemegdsen baraa baina");
    } catch (error) {
      toastifyInfo("Please login first");
    }
  };

  return (
    <div>
      <Header />
      <hr />
      <div className="flex flex-col gap-15 lg:flex-row w-screen h-screen lg:overflow-y-scroll relative">
        <div className="flex lg:flex-col w-auto lg:w-1/2 lg:h-auto lg:snap-y bg-white sm:overflow-scroll overflow-x-scroll snap-x snap-mandatory">
          {bag.colors?.[selectedColor]?.images.map((images, index) => (
            <img
              key={index}
              className="w-screen lg:h-screen snap-center"
              src={images}
              alt={`Color ${selectedColor + 1}`}
            />
          ))}
        </div>
        <div className="flex lg:flex-col items-center pt-6 lg:w-1/2 lg:pt-44 absolute bottom-0 lg:right-0 test mb-5 justify-center">
          <div className="lg:w-[550px] flex flex-col justify-between gap-2 ring-offset-1 bottom-0 w-4/5">
            <h1 className="text-sm uppercase">
              {bag.colors?.[selectedColor]?.bagCode}
            </h1>
            <h1 className=" font-bold text-xl text-black">{bag.bagName}</h1>
            <div className="w-auto flex justify-between items-center">
              <p>colors</p>
              <div className="flex gap-1">
                {bag.colors?.map((color, index) => (
                  <div
                    key={index}
                    style={{ background: color.adminColor }}
                    className="border border-spacing-2 border-black rounded-full w-4 h-4 cursor-pointer"
                    onClick={() => handleChangeColor(index)}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2 overflow-scroll">
              {bag.colors?.map((color, index) => (
                <img
                  key={index}
                  className="w-1/3 rounded-xl cursor-pointer"
                  src={color.images?.[1]}
                  onClick={() => handleChangeColor(index)}
                />
              ))}
            </div>
            <h1 className="flex self-end pt-3 font-semibold text-lg text-stone-600">
              ${bag.price}
            </h1>
            <div className="flex justify-center lg:flex-col w-auto items-center pt-10 gap-2">
              <button
                onClick={handleAddOrder}
                className="btn h-[60px] p-3 w-[90%] rounded-3xl bg-black text-white lg:text-black lg:bg-white lg:hover:bg-black lg:hover:text-white shadow-md border text-center">
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};
