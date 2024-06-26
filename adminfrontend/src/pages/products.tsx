/** @format */

import React from "react";
import { LeftNavBar } from "../components/LeftNavBar";
import { CreatingProduct } from "../components/CreatingProduct";
export default function products() {
  return (
    <div className="flex">
      <LeftNavBar />
      <div className="bg-stone-200 w-screen">
        <CreatingProduct />
      </div>
    </div>
  );
}
