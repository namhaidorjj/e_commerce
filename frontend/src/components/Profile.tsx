/** @format */

import { instance } from "@/utils/instance";
import { User, UserData } from "@/utils/types/bagType";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toastifyError, toastifySuccess } from "@/utils/alerts";
import { UserValueContext } from "@/contexts/UserContext";

export const Profile = () => {
  const [userData, setUserData] = useState<UserData>();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserValueContext);
  const [editedData, setEditedData] = useState<UserData>({
    email: "",
    userName: "",
    address: "",
    phoneNumber: "",
  });

  const fetchUserData = async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        const response = await instance.post("/user", {
          userId: decoded.id,
        });
        setUserData(response.data.users);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = () => {
    setEditedData(userData ? { ...userData } : editedData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await instance.put("/updateUser", editedData);
      fetchUserData();
      setIsEditing(false);
      toastifySuccess("Profile Edited");
    } catch (error) {
      toastifyError("Failed");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col  justify-center items-center relative">
      <img
        className="w-[100px] rounded-full"
        src="/assets/profile.jpeg"
        alt="Profile"
      />
      <div className="flex gap-6">
        <button
          className="mt-5 bg-white border hover:bg-black hover:text-white p-2 rounded-xl  "
          onClick={handleEdit}>
          Edit Profile
        </button>
        <a
          className=" mt-5 bg-white border hover:bg-black hover:text-white p-2 rounded-xl"
          href="/userHistory">
          History
        </a>
      </div>
      {isEditing ? (
        <>
          <div className=" flex flex-col gap-5 pt-6">
            <div className=" bg-gray-100 flex flex-col gap-2 w-[300px] p-3 rounded-2xl ">
              <p className=" font-bold">Name</p>
              <input
                className=" p-2 w-full flex items-center bg-white rounded-full "
                type="text"
                name="userName"
                value={editedData.userName}
                onChange={handleChange}
              />
            </div>
            <div className=" bg-gray-100 flex flex-col gap-2  w-[300px] p-3 rounded-2xl ">
              <p className=" font-bold">E-Mail</p>
              <input
                className=" p-2 w-full flex items-center bg-white rounded-full "
                type="text"
                name="email"
                value={editedData.email}
                onChange={handleChange}
              />
            </div>
            <div className=" bg-gray-100  flex flex-col gap-2  w-[300px] p-3 rounded-2xl ">
              <p className=" font-bold">Phone Number</p>
              <input
                className=" p-2 w-full flex items-center bg-white rounded-full "
                type="text"
                name="phoneNumber"
                value={editedData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className=" bg-gray-100 flex flex-col gap-2 w-[300px] p-3 rounded-2xl ">
              <p className="font-bold">Address</p>
              <input
                className=" p-2 w-full flex items-center bg-white rounded-full "
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="absolute left-5 flex justify-center items-center px-4 py-2 w-[70px] bg-white border hover:bg-black hover:text-white rounded-full mt-4 "
              onClick={handleSave}>
              Save
            </button>
            <button
              className="absolute right-5 flex justify-center items-center px-4 py-2 w-[70px] bg-white border hover:bg-black hover:text-white rounded-full mt-4 "
              onClick={() => setIsEditing(false)}>
              Back
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-5 pt-6">
            <div>
              <p className="text-black w-[300px] p-3  bg-gray-100 flex flex-col gap-2 rounded-2xl">
                <p className="font-bold">Name</p>
                <p className="p-3 h-[40px] flex items-center bg-white rounded-full">
                  {userData && userData.userName}
                </p>
              </p>
            </div>
            <div>
              <p className="w-[300px] p-3 bg-gray-100 flex flex-col gap-2 rounded-2xl">
                <p className="font-bold">E-Mail</p>
                <p className="p-3 h-[40px] flex items-center bg-white rounded-full">
                  {userData && userData.email}
                </p>
              </p>
            </div>
            <div>
              <p className="text-black w-[300px] p-3 bg-gray-100 flex flex-col gap-2 rounded-2xl">
                <p className="font-bold">Phone Number</p>
                <p className="p-3 h-[40px] flex items-center bg-white rounded-full">
                  {userData && userData.phoneNumber}
                </p>
              </p>
            </div>
            <div>
              <p className="text-black w-[300px] p-3 bg-gray-100 flex flex-col gap-2  rounded-2xl">
                <p className="font-bold">Address</p>
                <p className="p-3 h-[60px] flex  items-center bg-white rounded-full">
                  {userData && userData.address}
                </p>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
