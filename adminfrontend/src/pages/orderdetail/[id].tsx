/** @format */

import React from "react";
import { useRouter } from "next/router";
import { LeftNavBar } from "../../components/LeftNavBar";
import { OrderDetail } from "../../components/OrderDetail";

const Orderdetail = () => {
  const router = useRouter();
  const _id = router.query.id;
  return (
    <div className="flex">
      <LeftNavBar />
      <OrderDetail _id={_id} />
    </div>
  );
};
export default Orderdetail;
