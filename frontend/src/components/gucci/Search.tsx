/** @format */

import { useContext, useEffect, useState } from "react";
import { SearchValueContext } from "@/contexts/SearchValue";
import { Bag } from "@/utils/types/bagType";
import { instance } from "@/utils/instance";

export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchValueContext);
  const [mainData, setMainData] = useState<Bag[]>([]);
  const [products, setProducts] = useState<Bag[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await instance.get("/gucciBag");
      setProducts(response.data.bags);
      setMainData(response.data.bags);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center lg:pl-20 h-[90px] w-full  border-t items-center">
      <div className="lg:w-1/3 shadow-2xl bg-[#f8f8f8] flex items-center">
        <img
          className="w-4 h-4 ml-4 mr-4"
          src="../assets/icons/search.svg"
          alt="search"
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
}
