/** @format */

import React from "react";
import { Card } from "./Card";

interface ContentItem {
  brand: string;
  backgroundImage: string;
}

export const Content = () => {
  const contentSet: JSX.Element[] = [];

  const content: ContentItem[] = [
    {
      brand: "hermes",
      backgroundImage: "../../public/assets/hermes.jpeg",
    },
    {
      brand: "Gucci",
      backgroundImage: "../../public/assets/gucci.jpeg",
    },
    {
      brand: "Prada",
      backgroundImage: "../../public/assets/prada.jpeg",
    },
    {
      brand: "Louis Vuitton",
      backgroundImage: "../../public/assets/louisVuitton.jpeg",
    },
  ];

  content.forEach((item, index) => {
    contentSet.push(
      <Card
        key={index}
        // brand={item.brand}
        backgroundImage={item.backgroundImage}
      />
    );
  });
  return <div>{contentSet}</div>;
};
