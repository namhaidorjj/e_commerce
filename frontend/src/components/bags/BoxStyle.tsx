/** @format */

import React, { useState } from "react";

interface Bags {
  images: string[];
  bagName: string;
  adminColor: string;
}
interface Bag {
  bagName?: string;
  colors: Bags[];

  _id: string;

  adminColor: string;

}

interface BoxStyleProps {
  bags: Bag;
}

export const BoxStyle = ({ bags }: { bags: Bag }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleColorSelect = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    setSelectedImage(0);
  };

  const handlePrevClick = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === 0
        ? bags.colors[selectedColor].images.length - 1
        : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === bags.colors[selectedColor].images.length - 1
        ? 0
        : prevIndex + 1
    );
  };
  console.log("bag", bags);

  return (
    <div className="">
      <div className="relative w-full h-full ">
        <div className="carousel-container  relative w-full h-full ">
          {bags.colors[selectedColor]?.images.map((image: any, idx: number) => (
            <img
              key={idx}
              src={image}
              alt={`Color ${selectedColor + 1}`}
              style={{ display: idx === selectedImage ? "block" : "none" }}
            />
          ))}
          <div className="hover:cursor-pointer absolute flex justify-between inset-0 opacity-0 hover:opacity-100 left-5 right-5   ">
            <button className="p-3" onClick={handlePrevClick}>
              <p className="text-3xl">❮</p>
            </button>
            <button className="p-3" onClick={handleNextClick}>
              <p className="text-3xl">❯</p>
            </button>
          </div>
          <div className="absolute bottom-3 items-center left-3 right-5 flex justify-between">
            <a href={`${bags._id}`}>{bags.bagName || "Hermes"}</a>
            <div className="flex gap-1">
              {bags.colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    style={{ backgroundColor: color.adminColor }}
                    className={`border border-spacing-2 rounded-full w-4  h-4 cursor-pointer ${
                      selectedColor === index ? "" : ""
                    }`}
                    onClick={() => handleColorSelect(index)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
