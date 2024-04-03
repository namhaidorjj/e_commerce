/** @format */

import React, { useState } from "react";
import Header from "../Header";
import { Footer } from "../Footer";
import _ from "lodash";

type Bag = {
  _id: string;
  bagName: string;
  colors: {
    adminColor: string;
    bagCode: string;
    images: string[];
  }[];
  price: number;
};

type Props = {
  bag: Bag;
};

export const PageStyle: React.FC<Props> = ({ bag }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [removedColor, setRemovedColor] = useState(0);

  const handleChangeColor = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    setRemovedColor(colorIndex);
  };
  return (
    <>
      <Header />
      <hr></hr>
      <div className="flex w-screen h-screen overflow-y-scroll relative">
        <div className="flex flex-col w-1/2 h-auto bg-white ">
          {bag.colors?.[selectedColor]?.images.map((images) => (
            <img src={images} alt={`Color ${selectedColor + 1}`} />
          ))}
        </div>
        <div className="flex flex-col w-1/2 items-center pt-48 absolute right-0 test ">
          <div className="w-[550px] flex flex-col justify-between gap-2 ring-offset-1 bottom-0">
            <p className="text-sm">{bag.colors?.[selectedColor].bagCode}</p>
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
            <div className="flex w-[200px] gap-2">
              {bag.colors?.map((color, index) => (
                <img
                  key={index}
                  src={color.images?.[1]}
                  onClick={() => handleChangeColor(index)}
                />
              ))}
            </div>
            <h1 className="flex self-end pt-3 font-semibold text-lg text-stone-600">
              ${bag.price}
            </h1>
            <div className="flex flex-col w-auto items-center pt-10 gap-2">
              <button className=" btn w-[90%] rounded-3xl text-white">
                add to shopping bag
              </button>
              <button className=" btn w-[90%] rounded-3xl text-white">
                add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <Footer />
    </>
  );
};
