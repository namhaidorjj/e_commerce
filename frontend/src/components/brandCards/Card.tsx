/** @format */

import React from "react";

type ContentItem = {
  backgroundImage: string;
  path: string;
};

export const Card: React.FC<ContentItem> = ({ backgroundImage, path }) => {
  return (
    <>
      <a
        href={path}
        className="card lg:w-1/4 h-[200px] lg:h-[500px] bg-cover p-4 relative hover:opacity-80 rounded-none bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute lg:w-full flex justify-center bottom-10"></div>
      </a>
    </>
  );
};
