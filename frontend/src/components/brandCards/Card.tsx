/** @format */

import React from "react";

type ContentItem = {
  brand: string;
  backgroundImage: string;
  path: string;
};

export const Card: React.FC<ContentItem> = ({
  brand,
  backgroundImage,
  path,
}) => {
  return (
    <div
      className="card lg:w-1/4 h-1/2 bg-cover p-4 relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <p className="text-2xl">{brand}</p>
      <div className="absolute lg:w-full flex justify-center bottom-10">
        <a
          href={path}
          className="border p-5 lg:w-[150px] bg-black bg-opacity-30  hover:bg-opacity-70 flex justify-center items-center cursor-pointer rounded-md transform translate-y-1 transition duration-700 text-xl">
          Shop Now
        </a>
      </div>
    </div>
  );
};
