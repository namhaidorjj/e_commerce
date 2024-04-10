/** @format */

import { instance } from "@/instance";
import React, { useEffect, useState } from "react";
import { Loading } from "../components/sub_components/Loading";
import Link from "next/link";

type User = {
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

type Color = {
  images: string[];
  bagCode: string;
  CreatedAt: string;
  color: string;
  consumer: string;
  adminColor: string;
  status: string;
};

type Bag = {
  bagName: string;
  brand: string;
  price: number;
};

type OrderDetail = {
  _id: string;
  payment: string;
  userId: User;
  colors: Color;
  bagId: Bag;
};

type OrderDetailProps = {
  _id: string | string[] | undefined;
};

export const OrderDetail: React.FC<OrderDetailProps> = ({ _id }) => {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  useEffect(() => {
    if (_id) {
      const fetchDataId = async () => {
        try {
          const response = await instance.get(`/orderDetail/${_id}`);
          console.log(response.data.data, "response in OrderDetail");
          setOrder(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchDataId();
    }
  }, [_id]);

  // Date Formating Scene =============================
  const formatDate = (dataString: string) => {
    const date = new Date(dataString);
    const formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}-${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  };
  // Updating status in colors ========================
  const handleStatusChange = async (newStatus: string, colorId: string) => {
    try {
      await instance.put(`/updateColors/${colorId}`, { status: newStatus });
    } catch (error) {
      console.error("Error to update", error);
    }
  };
  return (
    <div className="bg-stone-200">
      <Link href={"/order"}>
        <div className="flex justify-center items-center mt-6 ml-4 bg-white w-[280px] h-[40px] text-stone-500 font-bold gap-[9px] rounded-lg cursor-pointer border border-stone-300 hover:bg-stone-500 hover:text-white duration-500">
          <i className="fa-solid fa-arrow-left-long"></i>
          <button>Захиалга руу буцах</button>
        </div>
      </Link>
      {order ? (
        <div className="bg-stone-200 w-screen text-stone-500 p-4 border flex">
          <div className="bg-white w-[627px] rounded-lg p-4 flex flex-col border border-stone-300">
            <div className="flex justify-between">
              <div>
                <div className="text-xs">Захиалгын ID дугаар</div>
                <div className="text-xs font-bold">{order._id}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs">Төлсөн эсэх</div>
                <div className="text-xs font-bold">{order.colors.consumer}</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-xs">Захиалагч: </div>
              <div className="flex gap-2 items-center">
                <div className="text-sm font-bold">{order.userId.userName}</div>
                <div className="text-sm font-thin">{order.userId.email}</div>
                <div className="text-sm font-thin">
                  {order.userId.phoneNumber}
                </div>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="overflow-x-auto h-[150px] rounded-l-lg scrollbar">
                <div>
                  {order.colors.images.map((img, imgIndex) => (
                    <div key={imgIndex}>
                      <img src={img} alt="" className="w-[150px]" />
                    </div>
                  ))}
                  <img alt="" className="w-full h-[150px]" />
                </div>
              </div>
              <div className="bg-stone-200 w-[430px] rounded-r-lg p-3 flex flex-col justify-between">
                <div className="">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs font-bold">Цүнхний нэр: </div>
                    <div className="text-lg">{order.bagId.bagName}</div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs font-bold">Брэнд: </div>
                    <div className="text-lg">{order.bagId.brand}</div>
                  </div>
                  <div className="flex justify-between w-[200px]">
                    <span className="text-xs font-bold">Цүнхний код: </span>
                    <span className="text-xs flex flex-col items-start">
                      {order.colors.bagCode}
                      <span className="text-xs">
                        {formatDate(order.colors.CreatedAt)}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-end font-bold">
                  {order.bagId.price}₮
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-[519px] bg-white rounded-lg border border-stone-300 ml-4">
              <div className="h-[55px] p-4">Хүргэлтийн мэдээлэл</div>
              <hr />
              <div className="p-4">
                <div className="text-xs font-bold">Хаяг:</div>
                {order.userId.address}
              </div>
              <hr />
              <div className="p-4 flex items-center justify-between">
                <div className="text-sm font-bold">Захиалгын төлөв</div>
                <div>
                  <select
                    value={order.colors.status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, order._id)
                    }
                    className="border border-stone-300 px-2 rounded-md py-1">
                    <option value=" ">Төлөв солих</option>
                    <option value="Бэлтгэгдэж байна">Бэлтгэгдэж байна</option>
                    <option value="Хүргэлтэнд гарсан">Хүргэлтэнд гарсан</option>
                    <option value="Хүргэгдсэн">Хүргэгдсэн</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[519px] mt-4 bg-white ml-4 rounded-lg border border-stone-300">
              <div className="h-[55px] p-4">Төлбрийн мэдээлэл</div>
              <hr />
              <div className="p-4">
                <div className="text-xs font-bold">Цүнхнүүд: </div>
                <div className="w-full flex justify-between">
                  <div>{order.bagId.bagName}</div>
                  <div>{order.bagId.price}₮</div>
                </div>
              </div>
              <hr />
              <div className="p-4">
                <div className="flex justify-between">
                  <div>Нийт төлөх дүн: </div>
                  <div>
                    {order.payment === "Not_Paid"
                      ? `${order.bagId.price}₮`
                      : "0₮"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-stone-200">
          <Loading />
          <div>Түр хүлээнэ үү...</div>
        </div>
      )}
    </div>
  );
};
