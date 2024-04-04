/** @format */

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GucciMain from "@/components/gucci/GucciMain";

const BASE_URL = "http://localhost:8080";
interface Bags {
  _id: string;
  images: string[];
  bagName: string;
}

export default function Gucci() {
  const [products, setProducts] = useState<Bags[]>([]);
  const [loading, setloading] = useState(false);

  const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await axios.get(BASE_URL + "/gucciBag");
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
    <div className="bg-white relative">
      <Header />
      <div className="obsolute">
        <GucciMain />
      </div>

      <Footer />
    </div>
  );
}
