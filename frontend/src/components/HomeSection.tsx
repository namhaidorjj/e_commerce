/** @format */

// components/HomeSection.tsx
import React from "react";
import { Card } from "./brandCards/Card";
import { useState, useEffect } from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";

export const HomeSection = () => {
  const cardProps = [
    {
      backgroundImage: "/assets/gucci.jpeg",
      path: "/bag/gucci",
    },
    {
      backgroundImage: "/assets/louisVuitton.jpeg",
      path: "/bag/gucci",
    },
    {
      backgroundImage: "/assets/hermes.jpeg",
      path: "/bag/gucci",
    },
    {
      backgroundImage: "/assets/prada.jpeg",
      path: "/bag/gucci",
    },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="lg:bg-[#FFFBEE]">
      <div
        className={`${
          isMobile ? "bg-mobile" : "bg-desktop"
        } h-screen lg:p-10 p-5 lg:w-full bg-center bg-black overflow-hidden}`}>
        <div className="text-white flex lg:gap-20 gap-10 justify-center font-mono">
          <button className="lg:text-base text-[14px] font-bold">
            HAND BAG
          </button>
          <button className="lg:text-base text-[14px] font-bold">
            BACK PACK
          </button>
          <button className="lg:text-base text-[14px] font-bold">
            ACCESSORY BAG
          </button>
          <button className="lg:text-base text-[14px] font-bold">
            TRAVEL BAG
          </button>
        </div>
        <div className="h-full flex justify-center items-end">
          <div
            className={`transition-opacity ${
              visible ? "opacity-100" : "opacity-0"
            } h-12 w-12 animate-bounce flex justify-center items-center overflow-y-scroll`}>
            <IoArrowDownCircleOutline size={50} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row bg-white">
        {cardProps.map((props, index) => (
          <Card key={index} {...props} />
        ))}
      </div>
    </div>
  );
};
