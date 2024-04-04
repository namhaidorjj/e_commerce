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
    <div className="">
      <Header />
      <hr></hr>

      <div className="flex flex-col gap-15 lg:flex-row w-screen h-screen overflow-y-scroll relative">
        <div className="flex lg:flex-col w-auto lg:w-1/2 lg:h-auto lg:snap-y bg-white overflow-scroll snap-x snap-mandatory">
          {bag.colors?.[selectedColor]?.images.map((images) => (
            <img
              className="w-screen lg:h-screen snap-center"
              src={images}
              alt={`Color ${selectedColor + 1}`}
            />
          ))}
        </div>
        <div className="flex lg:flex-col items-center pt-6 lg:w-1/2 lg:pt-44 absolute bottom-0 lg:right-0 test mb-5 justify-center">
          <div className="lg:w-[550px] flex flex-col justify-between gap-2 ring-offset-1 bottom-0 w-4/5">
            <h1 className="text-sm">{bag.colors?.[selectedColor].bagCode}</h1>
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
            <div className="flex gap-2 ">
              {bag.colors?.map((color, index) => (
                <img
                  className="w-1/3 rounded-xl"
                  key={index}
                  src={color.images?.[1]}
                  onClick={() => handleChangeColor(index)}
                />
              ))}
            </div>
            <h1 className="flex self-end pt-3 font-semibold text-lg text-stone-600">
              ${bag.price}
            </h1>

            <div className="flex justify-center lg:flex-col w-auto items-center pt-10 gap-2">
              <button className="btn h-[60px] p-3 w-[90%] rounded-3xl text-black bg-white  hover:bg-black hover:text-white shadow-md border text-center">
                Order
              </button>
              <button className="btn h-[60px] p-3 w-[90%] rounded-3xl text-black bg-white  hover:bg-black hover:text-white shadow-md border text-center">
                Add to bag
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
