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
      <div className="flex flex-col gap-15 lg:flex-row w-screen h-screen overflow-y-scroll relative">
        <div className="flex lg:flex-col w-auto lg:w-1/2 lg:h-auto lg:snap-y bg-white overflow-scroll snap-x snap-mandatory">
          {bag.colors?.[selectedColor]?.images.map((images) => (
            <img
              className="w-screen snap-center"
              src={images}
              alt={`Color ${selectedColor + 1}`}
            />
          ))}
        </div>
        <div className="flex w-auto lg:flex-col h-1/2 items-center pt-6 justify-center lg:pt-44 absolute bottom-0 lg:right-0 test mb-5">
          <div className="lg:w-[550px] flex flex-col justify-between gap-2 ring-offset-1 bottom-0 w-[200px]">
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
              <button className="btn w-[70%] p-1 justify-center items-center lg:w-[90%] rounded-3xl text-black bg-white  hover:bg-black hover:text-white shadow-md">
                Add to shopping bag
              </button>
              <button className="btn w-[70%] p-1 justify-center items-center lg:w-[90%] rounded-3xl text-black bg-white  hover:bg-black hover:text-white shadow-md">
                Add to bag
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
