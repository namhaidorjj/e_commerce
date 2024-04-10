/** @format */

import { instance } from "@/utils/instance";
import { Orders, User } from "@/utils/types/bagType";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserHistory = () => {
  const [orderData, setOrderData] = useState<Orders[]>([]);
  const fetchData = async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        const response = await instance.post("/order", {
          userId: decoded.id,
        });
        setOrderData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full h-full">
        <div className="w-auto h-[80px] text-2xl bg-orange-50 mx-4 flex items-center pl-20">
          HISTORY
        </div>
        <div className="w-auto h-[80px] mx-4 flex items-center pl-20">
          {orderData.map((bag, index) => (
            <div>
              <div>
                <img src={bag.colors[0]?.images[1]} alt="" />
              </div>
              <div>
                <p>{bag.bagId?.bagName}</p>
                <p>{bag.colors[0]?.bagCode}</p>
                <p>{bag.colors[0]?.color}</p>
                <div
                  style={{ backgroundColor: bag.colors[0]?.adminColor }}
                  className="border border-spacing-2 rounded-full w-5 h-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
