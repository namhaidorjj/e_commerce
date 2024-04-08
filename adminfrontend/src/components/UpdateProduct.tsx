/** @format */

import React from "react";
import { useRouter } from "next/router";
import { Loading } from "../components/sub_components/Loading";
import { useEffect, useState } from "react";
import { instance } from "@/instance";

type Color = {
  _id: string;
  color: string;
  adminColor: string;
  bagCode: string;
  images: string[];
};

type Bag = {
  _id: string;
  bagName: string;
  bagType: string;
  brand: string;
  price: number;
  sale?: number;
  colors: Color[];
};

export const UpdateProduct = () => {
  const router = useRouter();
  const [oldBag, setOldBag] = useState<Bag | null>(null);
  const [adminColor, setAdminColor] = useState<String[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatedBag, setUpdatedBag] = useState<Bag>();

  // Route back to product list =====
  const handleBack = () => {
    router.push("/productnav");
  };
  // Fetching data wich need to be update ===========
  useEffect(() => {
    const { _id } = router.query;
    const fetchBagEdit = async (_id: string) => {
      try {
        const response = await instance.get<{ product: Bag }>(
          `/products/${_id}`
        );
        setOldBag(response.data.product);
      } catch (error) {
        console.error(error);
      }
    };
    if (_id) {
      fetchBagEdit(_id as string);
    }
  }, [router.query?._id]);

  // Handling update new data =====================
  const handleUpdateBag = async () => {
    setLoading(true);
    try {
      const response = await instance.put(
        `/productUpdate/${oldBag?._id}`,
        updatedBag
      );
      alert(response.data.message);
      router.push("/productnav");
    } catch (error) {
      console.error("Error updating bag:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string,
    colorIndex: number
  ) => {
    if (!oldBag) return;

    const { value } = e.target;

    setUpdatedBag((prevBag) => {
      if (!prevBag) {
        return {
          _id: oldBag._id,
          bagName: oldBag.bagName,
          bagType: oldBag.bagType,
          brand: oldBag.brand,
          price: oldBag.price,
          sale: oldBag.sale,
          colors: oldBag.colors.map((color) => ({ ...color })),
        };
      }
      const updatedBagCopy = { ...prevBag };
      if (fieldName === "colors") {
        updatedBagCopy.colors[colorIndex].color = value;
      } else if (fieldName === "adminColor") {
        const newAdminColors = [...adminColor];
        newAdminColors[colorIndex] = value;
        setAdminColor(newAdminColors);
        updatedBagCopy.colors[colorIndex].adminColor = value;
      } else {
        (updatedBagCopy as any)[fieldName] = value;
      }
      return updatedBagCopy;
    });
  };

  if (!oldBag || loading) {
    return (
      <p className="w-screen h-screen flex justify-center items-center">
        <Loading />
      </p>
    );
  }

  return (
    <div className="h-full text-stone-500">
      <div className="w-[900px] m-auto mb-10">
        <button
          className="mt-10 border px-4 py-2 text-stone-500 font-bold rounded-lg bg-white flex gap-4 items-center border-stone-300 hover:bg-stone-500 hover:text-white duration-500"
          onClick={handleBack}>
          <i className="fa-solid fa-arrow-left"></i>
          Бүтээгдэхүүнээ харах
        </button>
      </div>
      <div className="flex flex-col items-center bg-white mb-20 w-[900px] m-auto p-4 rounded-lg border border-stone-300">
        <div className="flex flex-col items-start w-[800px] gap-2">
          <h2 className="text-xl font-bold mb-5">Засах цүнх:</h2>
          <label className="flex gap-2 justify-between w-[400px]">
            Цүнхний нэр:
            <input
              type="text"
              defaultValue={oldBag.bagName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e, "bagName", 0)
              }
              className="border border-stone-300 px-2 rounded-md"
            />
          </label>
          <label className="flex gap-2 justify-between w-[400px]">
            Цүнхний төрөл:
            <select
              defaultValue={oldBag.bagType}
              className="border cursor pointer py-1 rounded-lg">
              <option value="">Төрөл сонгох</option>
              <option value="Hand_bag">Hand bag</option>
              <option value="Accessory_bag">Accessory bag</option>
              <option value="Travel_bag">Travel bag</option>
              <option value="Back_pack">Back pack</option>
            </select>
          </label>
          <label className="flex gap-2 justify-between w-[400px]">
            Брэнд:
            <select
              defaultValue={oldBag.brand}
              className="border cursor pointer py-1 rounded-lg">
              <option value="">Төрөл сонгох</option>
              <option value="Hand_bag">Hand bag</option>
              <option value="Accessory_bag">Accessory bag</option>
              <option value="Travel_bag">Travel bag</option>
              <option value="Back_pack">Back pack</option>
            </select>
          </label>
          <label className="flex gap-2 justify-between w-[400px]">
            Үнэ:
            <input
              type="number"
              defaultValue={oldBag.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e, "price", 0)
              }
              className="border border-stone-300 px-2 rounded-md"
            />
          </label>
          <label className="flex gap-2 justify-between w-[400px]">
            Хямдрал:
            <input
              type="number"
              defaultValue={oldBag.sale || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e, "sale", 0)
              }
              className="border border-stone-300 px-2 rounded-md"
            />
          </label>
        </div>
        <div className="border p-4 mt-5 mb-5">
          <h3 className="text-xl font-bold mb-4">Өнгө:</h3>
          {oldBag.colors.map((color, colorIndex) => (
            <div key={colorIndex}>
              <div className="flex flex-col w-[800px] gap-2 mb-5">
                <label className="flex gap-2 justify-between w-[400px]">
                  Хэрэглэгчийн өнгө:
                  <input
                    type="text"
                    defaultValue={color.color}
                    onChange={(e) => handleInputChange(e, "colors", colorIndex)}
                    className="border border-stone-300 px-2 rounded-md"
                  />
                </label>
                <label className="flex gap-2 justify-between w-[400px]">
                  Админы өнгө:
                  <input
                    type="color"
                    onChange={(e) => {
                      setAdminColor([...adminColor, e.target.value]);
                      handleInputChange(e, "adminColor", colorIndex);
                    }}
                    className="border border-stone-300 px-2 rounded-md"
                  />
                  <p>{adminColor[colorIndex] || color.adminColor}</p>
                </label>
                <label className="flex gap-2 justify-between w-[400px]">
                  Bag Code:
                  <input
                    type="text"
                    value={color.bagCode}
                    onChange={(e) =>
                      handleInputChange(e, "bagCode", colorIndex)
                    }
                    className="border border-stone-300 px-2 rounded-md"
                  />
                </label>
              </div>
              <label className="flex flex-col items-center">
                Images:
                <div className="flex gap-10 mb-6">
                  {color.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      className="w-[200px] mb-10 rounded"
                      alt={`Image ${imgIndex}`}
                    />
                  ))}
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="w-[840px] flex justify-end">
          <button
            type="submit"
            onClick={handleUpdateBag}
            className="border py-1 rounded-lg hover:text-white hover:bg-stone-500 duration-300 w-[300px] h-[60px] my-8 text-xl font-bold">
            Цүнх засах
            <i className="fa-solid fa-wrench ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
