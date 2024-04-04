/** @format */

import React from "react";
import { LeftNavBar } from "../components/LeftNavBar";
import { UpdateProduct } from "../components/UpdateProduct";

const UpdateProducts = () => {
  return (
    <div className="flex">
      <LeftNavBar />
      <div className="bg-stone-200 w-screen">
        <UpdateProduct />
      </div>
    </div>
  );
};
export default UpdateProducts;
