/** @format */

import { PageStyle } from "@/components/bags/PageStyle";
import LoadingPage from "@/components/LoadingPage";
import { instance } from "@/instance";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

type Bag = {
  _id: string;
  images: string[];
  bagName: string;
  colors: {
    adminColor: string;
    bagCode: string;
  }[];
  price: number;
};

interface Query {
  id: string;
}

const BagPage = () => {
  const [bag, setBag] = useState<Bag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { query } = useRouter();
  console.log(query);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (query.id && query.id[0]) {
        try {
          const response = await instance.get(`${BASE_URL}/bag/${query.id[0]}`);
          setBag(response.data.bag);
          setError(null);
        } catch (error) {
          console.error(error);
          setError("Failed to fetch bag data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [query.id]);

  return (
    <div className="bg-white">
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="bag-page">
          <PageStyle bag={bag} />
        </div>
      )}
    </div>
  );
};

export default BagPage;
