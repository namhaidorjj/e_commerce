/** @format */

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { instance } from "@/instance";
import { Loading } from "./sub_components/Loading";
import Loadingpage from "../pages/loading";

type ErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};

export const CreatingProduct = () => {
  const router = useRouter();
  const [bagName, setBagName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [bagType, setBagType] = useState("");
  const [sale, setSale] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [adminColorInput, setAdminColorInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [consumerInput, setConsumerInput] = useState("asdasd");
  const [statusInput, setStatusInput] = useState("fasd");
  const [colors, setColors] = useState<
    {
      colorName: string;
      adminColor: string;
      bagCode: string;
      images: string[];
      consumer: string;
      status: string;
    }[]
  >([]);

  const [uploadedImage01, setUploadedImage01] = useState<string | undefined>();
  const [uploadedImage02, setUploadedImage02] = useState<string | undefined>();
  const [uploadedImage03, setUploadedImage03] = useState<string | undefined>();
  const [imageLoading01, setImageLoading01] = useState(false);
  const [imageLoading02, setImageLoading02] = useState(false);
  const [imageLoading03, setImageLoading03] = useState(false);

  const handleBack = () => {
    router.push("/productnav");
  };
  // Creating New Bag Scene ============================================
  const handleAddBag = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const bagData = {
        bagName,
        price,
        brand,
        bagType,
        sale,
        colors: colors.map((color) => ({
          colorName: color.colorName,
          adminColor: color.adminColor,
          bagCode: color.bagCode,
          images: color.images,
          consumer: consumerInput,
          status: statusInput,
        })),
      };
      const response = await axios.post(
        "http://localhost:8080/bagCreate",
        bagData
      );
      alert(response.data.message);
      setBagName("");
      setPrice("");
      setBrand("");
      setBagType("");
      setSale("");
      setColors([]);
      setImages(null);
    } catch (error) {
      alert((error as ErrorType)?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  //Uploading image and recieving to uploadedImage state =====================
  // Upload01 ===
  const uploadImage01 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading01(true);
    const config = { headers: { "Content-type": "multipart/form-data" } };
    const formData = new FormData();
    const target = e.target;
    const selectedFile = target.files as FileList;
    formData.append("image", selectedFile[0]);
    try {
      const res = await instance.post("/upload", formData, config);
      console.log(res, "Response");
      setUploadedImage01(res.data.imageUrl);
      alert("Зураг амжилттай Cloudinary-руу орлоо");
    } catch (error) {
      alert("Зураг оруулахад алдаа гарлаа");
    } finally {
      setImageLoading01(false);
    }
  };
  // Upload02 ===
  const uploadImage02 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading02(true);
    const config = { headers: { "Content-type": "multipart/form-data" } };
    const formData = new FormData();
    const target = e.target;
    const selectedFile = target.files as FileList;
    formData.append("image", selectedFile[0]);
    try {
      const res = await instance.post("/upload", formData, config);
      console.log(res, "Response");
      setUploadedImage02(res.data.imageUrl);
      alert("Зураг амжилттай Cloudinary-руу орлоо");
    } catch (error) {
      alert("Зураг оруулахад алдаа гарлаа");
    } finally {
      setImageLoading02(false);
    }
  };
  //upload03 ===
  const uploadImage03 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading03(true);
    const config = { headers: { "Content-type": "multipart/form-data" } };
    const formData = new FormData();
    const target = e.target;
    const selectedFile = target.files as FileList;
    formData.append("image", selectedFile[0]);
    try {
      const res = await instance.post("/upload", formData, config);
      console.log(res, "Response");
      setUploadedImage03(res.data.imageUrl);
      alert("Зураг амжилттай Cloudinary-руу орлоо");
    } catch (error) {
      alert("Зураг оруулахад алдаа гарлаа");
    } finally {
      setImageLoading03(false);
    }
  };
  // Adding colors ===========================
  const handleColorAdd = () => {
    if (colorInput !== "") {
      setImages(null);
      let newCode = Math.random().toString(16).slice(2, 8);
      const imagesArray: (string | undefined)[] = [
        uploadedImage01,
        uploadedImage02,
        uploadedImage03,
      ];
      const filteredImages = imagesArray.filter(
        (image) => image !== undefined
      ) as string[];
      setColors((prev) => [
        ...prev,
        {
          colorName: colorInput,
          adminColor: adminColorInput,
          bagCode: newCode,
          images: filteredImages,
          consumer: consumerInput,
          status: statusInput,
        },
      ]);
      setColorInput("");
      setConsumerInput("");
      setStatusInput("");
    }
    console.log(colors, "colors");
  };
  const handleColorDelete = (colorIndex: number) => {
    const updatedColors = [...colors];
    updatedColors.splice(colorIndex, 1);
    setColors(updatedColors);
  };
  return (
    <div>
      <div className="w-[800px] m-auto">
        <button
          className="mt-10 border px-4 py-2 text-stone-500 font-bold rounded-lg bg-white flex gap-4 items-center border-stone-300 hover:bg-stone-500 hover:text-white duration-500"
          onClick={handleBack}>
          <i className="fa-solid fa-arrow-left"></i>
          Бүтээгдэхүүнээ харах
        </button>
      </div>
      {loading ? (
        <Loadingpage />
      ) : (
        <div className="flex flex-col bg-white w-[800px] text-stone-500 justify-center p-8 gap-2 items-between mt-12 rounded-xl mb-[100px] m-auto">
          <div className="flex flex-col gap-3 w-[400px]">
            <label className="flex justify-between">
              Цүнхний нэр:
              <input
                type="text"
                value={bagName}
                onChange={(e) => setBagName(e.target.value)}
                className="border px-2 py-1 rounded-lg"
              />
            </label>
            <label className="flex justify-between">
              Үнэ:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border px-2 py-1 rounded-lg"
              />
            </label>
            <label className="flex justify-between">
              Брэнд:
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border cursor-pointer py-1 rounded-lg">
                <option value="">Брэнд сонгох</option>
                <option value="Prada">Prada</option>
                <option value="LV">LOUIS VUITTON</option>
                <option value="Gucci">Gucci</option>
                <option value="Hermes">Hermes</option>
              </select>
            </label>
            <label className="flex justify-between">
              Цүнхний төрөл:
              <select
                value={bagType}
                onChange={(e) => setBagType(e.target.value)}
                className="border cursor pointer py-1 rounded-lg">
                <option value="">Төрөл сонгох</option>
                <option value="Hand_bag">Hand bag</option>
                <option value="Accessory_bag">Accessory bag</option>
                <option value="Travel_bag">Travel bag</option>
                <option value="Back_pack">Back pack</option>
              </select>
            </label>

            <label className="flex justify-between">
              Хямдрал:
              <input
                type="number"
                value={sale}
                onChange={(e) => setSale(e.target.value)}
                className="border px-2 py-1 rounded-lg"
              />
            </label>
          </div>
          <label>
            <div className=" border p-6 border-gray-400 border-dashed rounded-lg mt-6">
              <p className="ml-5 text-gray-300 text-xs mb-2">
                Өнгө болон зураг оруулах хэсэг
              </p>
              <div>
                <div className="flex items-center gap-2 justify-between">
                  <div>
                    <p className="">Хэрэглэгчийн өнгө:</p>
                    <div className="flex justify-between flex-col">
                      <input
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        className="border w-[250px] px-2 py-1 ml-[16px] placeholder:text-xs placeholder:font-small rounded hover:shadow-md duration-300"
                        placeholder="Жишээ нь: Gold leather or Beige etc . . ."
                      />
                    </div>
                  </div>
                  <div>
                    <p className="">Админы өнгө:</p>
                    <div className="flex justify-between items-center w-[220px]">
                      <input
                        type="color"
                        value={adminColorInput}
                        onChange={(e) => setAdminColorInput(e.target.value)}
                        className="border w-[100px] h-10 px-2 py-1 ml-[16px] placeholder:text-xs placeholder:font-small rounded hover:shadow-md duration-300"
                      />
                      <div>{adminColorInput}</div>
                    </div>
                  </div>
                </div>
                {/* Зураг оруулах хэсэг ===== */}
                <div className="flex justify-around my-6">
                  <div className="group relative w-[200px] h-[150px] border rounded-xl border-dashed hover:shadow-lg duration-300">
                    {imageLoading01 ? (
                      <div className="flex justify-center mt-6">
                        <Loading />
                      </div>
                    ) : (
                      <div className="absolute mt-[65px] ml-[90px] group-hover:text-gray-300 duration-300">
                        {uploadedImage01 ? (
                          <i className="fa-solid fa-pen-to-square"></i>
                        ) : (
                          <i className="fa-solid fa-upload"></i>
                        )}{" "}
                      </div>
                    )}
                    <img
                      src={uploadedImage01}
                      alt=""
                      className="opacity-20 w-full h-full absolute"
                    />
                    <input
                      onChange={(e) => uploadImage01(e)}
                      type="file"
                      accept="image/*"
                      className="opacity-0 absolute w-full h-full bg-black cursor-pointer"
                    />
                  </div>

                  <div className="group relative w-[200px] h-[150px] border rounded-xl border-dashed hover:shadow-lg duration-300">
                    {imageLoading02 ? (
                      <div className="flex justify-center mt-6">
                        <Loading />
                      </div>
                    ) : (
                      <div className="absolute mt-[65px] ml-[90px] group-hover:text-gray-300 duration-300">
                        {uploadedImage02 ? (
                          <i className="fa-solid fa-pen-to-square"></i>
                        ) : (
                          <i className="fa-solid fa-upload"></i>
                        )}{" "}
                      </div>
                    )}
                    <img
                      src={uploadedImage02}
                      alt=""
                      className="opacity-20 w-full h-full absolute"
                    />
                    <input
                      onChange={(e) => uploadImage02(e)}
                      type="file"
                      accept="image/*"
                      className="opacity-0 absolute w-full h-full bg-black cursor-pointer"
                    />
                  </div>
                  <div className="group relative w-[200px] h-[150px] border rounded-xl border-dashed hover:shadow-lg duration-300">
                    {imageLoading03 ? (
                      <div className="flex justify-center mt-6">
                        <Loading />
                      </div>
                    ) : (
                      <div className="absolute mt-[65px] ml-[90px] group-hover:text-gray-300 duration-300">
                        {uploadedImage03 ? (
                          <i className="fa-solid fa-pen-to-square"></i>
                        ) : (
                          <i className="fa-solid fa-upload"></i>
                        )}{" "}
                      </div>
                    )}
                    <img
                      src={uploadedImage03}
                      alt=""
                      className="opacity-20 w-full h-full absolute"
                    />
                    <input
                      onChange={(e) => uploadImage03(e)}
                      type="file"
                      accept="image/*"
                      className="opacity-0 absolute w-full h-full bg-black cursor-pointer"
                    />
                  </div>
                </div>
                {/* ============= */}
                <button
                  onClick={handleColorAdd}
                  type="button"
                  className="border border-stone-300 text-stone-500 px-3 rounded-lg hover:text-white hover:bg-stone-500 duration-500 w-[300px] h-10 m-auto font-bold">
                  Өнгө болон зурагнууд нэмэх
                </button>
              </div>
            </div>
            <div>
              {colors.map(
                ({ colorName, bagCode, images: colorImages }, colorIndex) => (
                  <div
                    key={colorIndex + colorName}
                    className="flex items-center justify-around w-full">
                    <div className="">
                      <p className="text-[10px] text-gray-500">User color:</p>
                      <div>{colorName}</div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Bag code:</p>
                      <div>{bagCode}</div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Admin color:</p>
                      <div>{adminColorInput}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500">Images</div>
                      {colorImages.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Color ${colorIndex} Image ${index}`}
                          className="w-[50px] h-[50px]"
                        />
                      ))}
                    </div>
                    <button
                      className=""
                      type="button"
                      onClick={() => handleColorDelete(colorIndex)}>
                      <i className="fa-solid fa-trash text-gray-400 text-sm"></i>
                    </button>
                  </div>
                )
              )}
            </div>
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={handleAddBag}
              className="border border-stone-300 py-1 rounded-lg hover:text-white hover:bg-stone-500 text-stone-500 duration-500 w-[300px] h-[60px] my-8 text-xl font-bold">
              Цүнх үүсгэх
              <i className="fa-solid fa-file-import ml-2"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
