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
          {bags.colors[selectedColor].images.map(
            (image: string, idx: number) => (
              <a href={`./${bags._id}`}>
                <img
                  key={idx}
                  src={image}
                  alt={`Color ${selectedColor + 1}`}
                  className="snap-center"
                  style={{ display: idx === selectedImage ? "block" : "none" }}
                />
              </a>
            )
          )}
          <button
            className="p-5 w-1/3 text-3xl h-5/6 top-0 hover:cursor-pointer absolute hidden lg:flex lg:items-center opacity-0 hover:opacity-100"
            onClick={handlePrevClick}>
            ❮
          </button>
          <button
            className="p-5 w-1/3 justify-end text-3xl h-5/6 top-0 right-0 hover:cursor-pointer absolute hidden lg:flex lg:items-center opacity-0 hover:opacity-100"
            onClick={handleNextClick}>
            ❯
          </button>
          <div className="absolute bottom-3 items-center left-3 right-5 flex justify-between">
            <a
              className="font-semibold text-[22px] lg:text-[18px] uppercase"
              href={`./${bags._id}`}>
              {bags.bagName}
            </a>
            <div className="flex gap-1 w-full justify-end">
              {bags.colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    style={{ backgroundColor: color.adminColor }}
                    className={`lg:rounded-full lg:w-4 lg:h-4 h-5 w-1/4 cursor-pointer ${
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
