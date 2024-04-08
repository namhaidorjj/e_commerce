/** @format */

import { useEffect, useState } from "react";
import { Cart } from "@/components/Cart";
import { useRouter } from "next/router";
import { instance } from "@/utils/instance";
import { Bag, Color } from "@/utils/types/bagType";
import LoadingPage from "@/components/LoadingPage";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const Order = () => {
  const [bags, setBags] = useState<Bag>({
    _id: "",
    bagName: "",
    colors: [],
    price: 0,
  });
  const [colors, setColors] = useState<Color>({
    color: "",
    _id: "",
    bagCode: "",
    adminColor: "",
    images: [""],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { query } = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const token = Cookies.get("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded) {
            const response = await instance.post("/order", {
              userId: decoded.id,
            });
            setBags(response.data);
            setColors(response.data);
            console.log("res.data", response.data);
            setError(null);
          } else {
            setError("Invalid or expired token");
          }
        } catch (error) {
          console.error(error);
          setError(
            "Failed to decode token or fetch bag data. Please try again later."
          );
        } finally {
          setLoading(false);
        }
      } else {
        setError("Access token not found");
        setLoading(false);
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
          <Cart variant="outline" bag={bags} colors={colors} />
          <div>hi</div>
        </div>
      )}
    </div>
  );
};
