/** @format */

import { instance } from "@/utils/instance";
import { Orders, User } from "@/utils/types/bagType";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toastifySuccess } from "@/utils/alerts";

export default function Order() {
  const [orderData, setOrderData] = useState<Orders[]>([]);

  useEffect(() => {
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
    fetchData();
  }, []);

  const createOrder = async (orderData: Orders[]) => {
    try {
      const orderRes = await instance.post("/createOrder");
      toastifySuccess("Order created");
    } catch (error) {
      console.error("error in create order", error);
    }
  };
  return (
    <div className="w-full">
      {orderData.map((bag: any, bagIndex: number) => (
        <div
          key={bagIndex}
          tabIndex={bagIndex}
          className="flex w-full gap-4 py-4">
          <img
            className="w-1/6 rounded-xl cursor-pointer"
            src={bag.colors[0].images?.[1]}
          />
          <div className="flex flex-col justify-start w-1/2">
            <h1 className="font-bold text-lg text-black">{bag?.bagName}</h1>
            <div className="flex justify-between items-center">
              <div className="flex w-auto pt-4 pb-2">
                <p>Bag Code:</p>&nbsp;
                <p>{bag.colors[0].bagCode || `982373`}</p>
              </div>
            </div>
            <div className="flex w-auto pt-4 pb-2 items-center gap-2">
              <p>Bag Color:</p>&nbsp;
              <p>{bag.colors[0].color || `black`}</p>
              <div
                style={{ background: bag.colors[0].adminColor }}
                className="border border-spacing-1 w-4 h-4 rounded-full"
              />
            </div>
            <hr />
            <div className="flex w-auto justify-between pt-2">
              <p>Bag Price:</p>
              <p>{bag.bagId.price || `10`}₮</p>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => createOrder(orderData)}
        className="flex w-[100px] items-center justify-center border-black mt-5 rounded-xl self-end btn border border-spacing-2 p-2 hover:bg-black hover:text-white">
        buy
      </button>
    </div>
  );
}
