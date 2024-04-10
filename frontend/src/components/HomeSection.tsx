/** @format */

// components/HomeSection.tsx
import React from "react";
import { Card } from "./brandCards/Card";

export const HomeSection = () => {
  const cardProps = [
    {
      brand: "𝓗𝑒𝓇𝓂𝑒𝓈",
      backgroundImage: "/assets/hermes.jpeg",
      path: "/bag/hermes",
    },
    {
      brand: "𝒢𝓊𝒸𝒸𝒾",
      backgroundImage: "/assets/gucci.jpeg",
      path: "/bag/gucci",
    },
    {
      brand: "ꝒⱤ𐤠Ɗ𐤠",
      backgroundImage: "/assets/prada.jpeg",
      path: "/bag/prada",
    },
    {
      brand: "𝕃𝕠𝕦𝕚𝕤 𝕍𝕦𝕚𝕥𝕥𝕠𝕟",
      backgroundImage: "/assets/louisVuitton.jpeg",
      path: "/bag/lv",
    },
  ];

  return (
    <div className="bg-[#FFFBEE]">
      <div className="homeBG h-screen lg:p-10 p-5">
        <div className="text-white flex lg:gap-20 gap-10 justify-center font-mono">
          <button className="lg:text-base text-[14px]">HAND BAG</button>
          <button className="lg:text-base text-[14px]">BACK PACK</button>
          <button className="lg:text-base text-[14px]">ACCESSORY BAG</button>
          <button className="lg:text-base text-[14px]">TRAVEL BAG</button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row h-screen">
        {cardProps.map((props, index) => (
          <Card key={index} {...props} />
        ))}
      </div>
    </div>
  );
};
