/** @format */

import { UserValueContext } from "@/contexts/UserContext";
import { instance } from "@/utils/instance";
import { Order, User } from "@/utils/types/bagType";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserHistory = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const { user } = useContext(UserValueContext);
  const fetchData = async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        const response = await instance.post("/history", {
          userId: decoded.id,
        });
        console.log("data", response.data.data);
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
        <div className="w-auto h-[80px] text-2xl bg-orange-50 mx-4 flex gap-4 pl-20">
          HISTORY
        </div>
        <div className="w-auto h-[80px] mx-4 flex flex-col pl-20">
          {orderData.map((bag, index) => (
            <div className="flex justify-start items-center ">
              <div className=" mt-5">
                <img
                  className="w-[200px] h-[150px]"
                  src={bag.colors?.images[1]}
                  alt=""
                />
              </div>
              <div className="flex gap-2">
                <p className=" flex justify-center items-center p-4 bg-gray-100 rounded-lg">
                  {bag.bagId?.bagName}
                </p>
                <p className=" flex justify-center items-center p-4 bg-gray-100 rounded-lg">
                  {bag.colors?.bagCode}
                </p>
                <p className=" flex justify-center items-center p-4 bg-gray-100 rounded-lg">
                  {bag.colors?.color}
                </p>
                <div
                  style={{ backgroundColor: bag.colors?.adminColor }}
                  className="border border-spacing-2 rounded-full w-5 h-5"
                />
                <div className=" p-4 rounded-lg  flex justify-center items-center bg-gray-100">
                  {bag.colors?.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
