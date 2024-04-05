/** @format */

import React from "react";

interface CardProps {
  backgroundImage: string;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className=""
      style={{ backgroundImage: `url(${props.backgroundImage})` }}>
      Card
    </div>
  );
};
