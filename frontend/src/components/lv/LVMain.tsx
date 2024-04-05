/** @format */

import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import { Box } from "../bags/Box";
import { instance } from "@/utils/instance";
import { Bags, Bag } from "@/utils/types/bagType";

export const LVMain = () => {
  const [products, setProducts] = useState<Bag[]>([]);
  const [loading, setloading] = useState(false);

  const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await instance.get("/lvbag");
      setProducts(response.data.bags);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="bg-white">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="grid grid-cols-4 gap-1">
          {products.map((bag) => (
            <Box bags={bag} />
          ))}
        </div>
      )}
    </div>
  );
};
