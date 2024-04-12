/** @format */

import React, { useEffect, useState } from "react";
import { Loading } from "../components/sub_components/Loading";
import { instance } from "../instance";
import { useRouter } from "next/router";

type User = {
  userName: string;
};

type Color = {
  bagCode: string;
  color: string;
  adminColor: string;
  consumer: string;
};

type Bag = {
  bagName: string;
  price: number;
};

type Order = {
  _id: string;
  userId: User;
  colors: Color;
  bagId: Bag;
  CreatedAt: string;
  payment: string;
};

export const ConsumerOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/orderToAdmin");
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  // Date Formating Scene =============================
  const formatDate = (dataString: string) => {
    const date = new Date(dataString);
    const formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}-${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  };
  // Jumping to order detail ======================
  const handleOrderDetail = (_id: string) => {
    router.push(`/orderdetail/${_id}`);
  };
  //   Filtering order =======================
  const filteredOrders = orders.filter(
    (order) =>
      order.userId.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
      order.colors.color.toLowerCase().includes(searchInput.toLowerCase()) ||
      order.colors.bagCode.toLowerCase().includes(searchInput.toLowerCase()) ||
      order.bagId.bagName.toLowerCase().includes(searchInput.toLowerCase()) ||
      order.bagId.price.toString().includes(searchInput) ||
      order.colors.consumer.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="bg-stone-200 h-full w-full pb-10">
      <div className="text-2xl font-bold mb-4">Захиалга</div>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
          <Loading />
          <div>Түр хүлээнэ үү...</div>
        </div>
      ) : orders.length > 0 ? (
        <>
          <div className="w-[288px]"></div>
          <div className={`flex justify-between mb-6`}>
            <div className="flex border border-stone-300 text-stone-500 rounded-lg w-[419px] h-[40px] bg-white items-center px-4 gap-4">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className="w-[400px] px-2 placeholder:text-xs placeholder:text-stone-500 font-thin"
                value={searchInput}
                placeholder="Бүтээгдэхүүний нэр, Брэнд, Үнэ, Өнгө, Админ өнгө"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          {/* Product table */}
          <div className="w-[1150px] bg-white rounded">
            <table className="">
              <thead className="border-b text-stone-500">
                <tr className="flex w-[1150px] h-[44px] text-xs font-semibold px-2">
                  <th className="w-[40px] flex justify-start items-center">
                    №
                  </th>
                  <th className="w-[110px] h-[44px] flex justify-start items-center">
                    Үйлчлүүлэгч
                  </th>
                  <th className="w-[130px] h-[44px] flex justify-start items-center">
                    Цүнхний нэр
                  </th>
                  <th className="w-[110px] h-[44px] flex justify-start items-center">
                    Цүнхний код
                  </th>
                  <th className="w-[130px] h-[44px] flex justify-start items-center">
                    Цүнхний өнгө
                  </th>
                  <th className="w-[110px] h-[44px] flex justify-start items-center">
                    Өнгний код
                  </th>
                  <th className="w-[130px] h-[44px] flex justify-start items-center">
                    Захиалсан огноо
                  </th>
                  <th className="w-[100px] h-[44px] flex justify-center items-center">
                    Үнэ
                  </th>
                  <th className="w-[100px] h-[44px] flex justify-center items-center">
                    Төлөв
                  </th>
                  <th className="w-[120px] h-[44px] flex justify-end items-center">
                    Дэлгэрэнгүй
                  </th>
                </tr>
              </thead>
              <tbody>
                <>
                  {filteredOrders.map((order, orderIndex) => (
                    <tr className="flex px-2 w-[1150px]">
                      <td className="w-[40px] flex justify-start items-center text-xs text-stone-400">
                        {orderIndex + 1}
                      </td>
                      <td className="w-[110px] h-[44px] flex justify-start items-center ">
                        <div>{order.userId.userName}</div>
                      </td>
                      <td className="w-[130px] text-sm h-[44px] flex justify-start items-center">
                        {order.bagId.bagName}
                      </td>
                      <td className="w-[330px] h-[44px] flex justify-start items-center">
                        <div className="flex items-center">
                          <div className="w-[110px] h-[44px] flex justify-start items-center">
                            {order.colors.bagCode.toUpperCase()}
                          </div>
                          <td className="w-[130px] h-[44px] flex justify-start items-center">
                            {order.colors.color}
                          </td>
                          <td className="w-[100px] group flex">
                            <div
                              className={`w-4 h-4 rounded-full border border-white`}
                              style={{
                                backgroundColor: order.colors.adminColor,
                              }}></div>
                            <span className="absolute invisible group-hover:visible border bg-yellow-100 px-2 text-gray-400 ml-6 rounded-md font-thin">
                              {order.colors.adminColor}
                            </span>
                          </td>
                        </div>
                      </td>
                      <td className="w-[130px] h-[44px] flex justify-end items-center ">
                        {formatDate(order.CreatedAt)}
                      </td>
                      <td className="w-[100px] h-[44px] flex justify-end items-center mr-2">
                        {order.bagId.price}₮
                      </td>
                      <td className="w-[100px] flex justify-end items-center">
                        {order.colors.consumer}
                      </td>
                      <td className="w-[100px] flex justify-end items-center">
                        <i
                          className="fa-solid fa-arrow-right-long cursor-pointer hover:scale-150 duration-300"
                          onClick={() => handleOrderDetail(order._id)}></i>
                      </td>
                    </tr>
                  ))}
                  <div className="w-[1150px] h-5 bg-white rounded-b-xl"></div>
                </>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};
