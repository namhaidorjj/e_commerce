/** @format */

import React from "react";

export const InProgress = () => {
  return (
    <div className="h-min-screen relative w-min-screen">
      <div className="w-full h-[530px] bg-desktop blur-sm "></div>
      <div className="absolute top-1/2 left-1/2">
        <p className="text-[40px] text-white">Progress ...</p>
      </div>
    </div>
  );
};
