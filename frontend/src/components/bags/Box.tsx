/** @format */
import { useState } from "react";
import { Bag } from "@/utils/types/bagType";

export const Box = ({ bags }: { bags: Bag }) => {
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
  return (
    <div>
      <div className="relative w-full h-full ">
        <div className="carousel-container relative w-full h-full overflow-scroll">
          {bags.colors[selectedColor].images.map((image: any, idx: number) => (
            <img
              key={idx}
              src={image}
              alt={`Color ${selectedColor + 1}`}
              className="snap-center"
              style={{ display: idx === selectedImage ? "block" : "none" }}
            />
          ))}
          <div className="hover:cursor-pointer absolute hidden lg:flex justify-between inset-0 opacity-0 hover:opacity-100 left-5 right-5   ">
            <button className="p-3 text-3xl" onClick={handlePrevClick}>
              ❮
            </button>
            <button className="p-3 text-3xl" onClick={handleNextClick}>
              ❯
            </button>
          </div>
          <div className="absolute bottom-3 items-center left-3 right-5 flex justify-between">
            <a href={`./${bags._id}`}>{bags.bagName}</a>
            <div className="flex gap-1">
              {bags.colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    style={{ backgroundColor: color.adminColor }}
                    className={`rounded-full w-4  h-4 cursor-pointer ${
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
