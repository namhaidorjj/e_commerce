/** @format */

import { instance } from "@/instance";
import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";
import Charts from "./Charts";

type Order = {
  bagId: {
    price: number;
  };
  colors: {
    consumer: string;
  };
};

export const DashBoard = () => {
  const [orderDate, setOrderDate] = useState<Order[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const fetchOrder = async () => {
    try {
      const response = await instance.get("/orderByDate");
      setOrderDate(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(orderDate, "OrderDate");
    fetchOrder();
    handleWeek();
  }, []);

  const datasets = [
    {
      label: "Орлого",
      data: [
        orderDate.reduce((previousValue, currentValue) => {
          if (currentValue.colors.consumer === "true") {
            return previousValue + currentValue.bagId.price;
          } else {
            return previousValue;
          }
        }, 0),
      ],
      labels: labels,
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      label: "Захиалгын нийт мөнгөн дүн",
      data: [
        orderDate.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.bagId.price;
        }, 0),
      ],
      labels: labels,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ];
  const handleWeek = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date();
    let dayOfWeek = currentDate.getDay();
    const dayLabels: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (dayOfWeek + i) % 7;
      dayLabels.push(dayNames[dayIndex]);
    }
    setLabels(dayLabels);
  };

  return (
    <div className="text-stone-500">
      <div className="bg-stone-200 w-screen h-screen">
        <div className="flex ml-6 gap-6 pt-[36px] ">
          <div className="flex flex-col justify-between w-[573px] h-[136px] bg-white rounded-xl px-6 py-4 hover:scale-[1.01] duration-200">
            <div className="flex text-base font-semibold gap-[13.7px] items-center">
              <i className="fa-solid fa-dollar-sign"></i>
              <p>Орлогын мэдээлэл</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div>Орлого:</div>
                <div className="text-xl font-bold">
                  {orderDate.reduce((previousValue, currentValue) => {
                    if (currentValue.colors.consumer === "true") {
                      return previousValue + currentValue.bagId.price;
                    } else {
                      return previousValue;
                    }
                  }, 0)}
                  ₮
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>Захиалгын нийт мөнгөн дүн:</div>
                <div className="text-xl font-bold">
                  {orderDate.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.bagId.price;
                  }, 0)}
                  ₮
                </div>
              </div>
            </div>
            <p className="text-[14px] font-normal text-[#5E6166]">Өнөөдөр</p>
          </div>
          <div className="flex flex-col justify-between w-[573px] h-[136px] bg-white rounded-xl px-6 py-4 hover:scale-[1.01] duration-200">
            <div className="flex text-base font-semibold gap-[13.7px] items-center">
              <i className="fa-solid fa-chalkboard"></i>
              <p>Захиалга</p>
            </div>
            <div className="text-[32px] font-bold">{orderDate.length}</div>
            <p className="text-[14px] font-normal text-[#5E6166]">Өнөөдөр</p>
          </div>
        </div>
        <div className="w-[800px] p-4 bg-white ml-6 mt-6 rounded-lg hover:scale-[1.02] duration-300">
          <Charts datasets={datasets} />
        </div>
      </div>
    </div>
  );
};
