import React from "react";

import { LeftNavBar } from "../components/LeftNavBar";
import { OrderNav } from "../components/OrderNav";

const order = () => {
  return (
    <div className="flex">
      <LeftNavBar />
      <OrderNav />
    </div>
  );
};
export default order;
