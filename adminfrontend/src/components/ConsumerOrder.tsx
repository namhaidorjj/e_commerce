/** @format */

import React, { useState } from "react";
import { Loading } from "../components/sub_components/Loading";
import { instance } from "../instance";

export const ConsumerOrder = () => {
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    console.log(loading);
    setLoading(true);
    // console.log("first");
    try {
      const response = await instance.get("/bag");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>asd</div>
    </div>
  );
};
