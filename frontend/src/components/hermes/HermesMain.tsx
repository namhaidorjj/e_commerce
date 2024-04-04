/** @format */
import React, { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
import { Box } from "@/components/bags/Box";
import { Bag, Bags } from "@/utils/types/bagType";
import { instance } from "@/utils/instance";

export default function GucciMain() {
  const [products, setProducts] = useState<Bag[]>([]);
  const [loading, setloading] = useState(false);

  const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await instance.get("/hermesBag");
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
}
