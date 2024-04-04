/** @format */

import { useState } from "react";
import { FaQTable } from "./FaQTable";
import { First } from "./First";
import { Second } from "./Second";
import { Third } from "./Third";
import { Fourth } from "./Fourth";

export const FaQMain = () => {
  const [activeComponent, setActiveComponent] = useState(1);
  const handleComponentChange = (componentNumber: number): void => {
    setActiveComponent(componentNumber);
  };

  return (
    <div className="bg-[#f6f5f3] py-10 px-20 text-[#19110B] flex flex-col gap-9">
      <div className="flex flex-col gap-4">
        <p className="text-[32px] font-medium">FAQ</p>
        <p className="">Find out more informations with our FAQ</p>
      </div>
      <div>
        <div className="flex gap-6">
          <div className="flex flex-col w-1/2 bg-white rounded-lg">
            <p className="text-[24px] border-b p-8">THEMES</p>
            <FaQTable />
          </div>
          <div className="flex flex-col w-1/2 bg-white rounded-lg">
            <p className="p-8 border-b text-[24px]">FREQUENT QUESTIONS</p>
            <div className="pb-2 px-8 pt-4 flex flex-col gap-6 items-start h-auto">
              <button onClick={() => handleComponentChange(1)}>
                <u>What are the benefits of creating a MyLV account?</u>
              </button>
              <button onClick={() => handleComponentChange(2)}>
                <u>Are the restrictions in terms of delivery addresses?</u>
              </button>
              <button onClick={() => handleComponentChange(3)}>
                <u>How do I place an order on louisvuitton.com?</u>
              </button>
              <button onClick={() => handleComponentChange(4)}>
                <u>How can I repair my Louis Vuitton product?</u>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {activeComponent === 1 && <First />}
        {activeComponent === 2 && <Second />}
        {activeComponent === 3 && <Third />}
        {activeComponent === 4 && <Fourth />}
      </div>
    </div>
  );
};
