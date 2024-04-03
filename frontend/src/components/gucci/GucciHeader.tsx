/** @format */

import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { SearchValueContext } from "../../../contexts/SearchValue";

export const GucciHeader = () => {
  const BASE_URL = "http://localhost:8080";
  interface Bags {
    _id: string;
    images: string[];
    bagName: string;
    adminColor: string;
  }
  interface Bag {
    bagName?: string;
    colors: Bags[];
    adminColor: string;
    color: string;
  }
  const { searchValue, setSearchValue } = useContext(SearchValueContext);
  const [mainData, setMainData] = useState<Bag[]>([]);
  const [products, setProducts] = useState<Bag[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(BASE_URL + "/gucciBag");
      setProducts(response.data.bags);
      setMainData(response.data.bags);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <div className="flex justify-center lg:pl-20 h-[90px] w-full border border-t items-center">
      <div className="lg:w-1/3 shadow-2xl bg-[#f8f8f8] flex items-center border rounded-sm">
        <img
          className="w-4 h-4 ml-4 mr-4"
          src="assets/icons/search.svg"
          alt=""
        />
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          type="text"
          placeholder="Shop New This Spring"
          className="h-[32px] bg-[#f8f8f8] outline-0 w-full"
        />
      </div>
    </div>
  );
};
