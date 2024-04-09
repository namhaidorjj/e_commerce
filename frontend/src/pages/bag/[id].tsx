/** @format */

import { BagDetail } from "@/components/bags/BagDetail";
import LoadingPage from "@/components/LoadingPage";
import { instance } from "@/utils/instance";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Bag, Bags } from "@/utils/types/bagType";

export default function BagPage() {
  const [bag, setBag] = useState<Bag>({
    _id: "",
    bagName: "",
    colors: [],
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (query.id && query.id[0]) {
        try {
          const response = await instance.get(`/bag/${query.id}`);
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
          <BagDetail bag={bag} />
        </div>
      )}
    </div>
  );
}
