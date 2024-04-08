/** @format */

// /** @format */

// import React from "react";
// import { Card } from "./Card";

// type ContentItem = {
//   brand: string;
//   backgroundImage: string;
// };

// export const Content = () => {
//   const contentSet: JSX.Element[] = [];

//   const content: ContentItem[] = [
//     {
//       brand: "Hermes",
//       backgroundImage: "../../public/assets/hermes.jpeg",
//     },
//     {
//       brand: "Gucci",
//       backgroundImage: "../../public/assets/gucci.jpeg",
//     },
//     {
//       brand: "Pradaa",
//       backgroundImage: "../../public/assets/prada.jpeg",
//     },
//     {
//       brand: "Louis Vuitton",
//       backgroundImage: "../../public/assets/louisVuitton.jpeg",
//     },
//   ];

//   content.forEach((props, index) => {
//     contentSet.push(
//       <Card
//         key={index}
//         brand={props.brand}
//         backgroundImage={props.backgroundImage}
//       />
//     );
//   });
//   return <div>{contentSet}</div>;
// };
