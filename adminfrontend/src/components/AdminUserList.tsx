/** @format */

import { instance } from "@/instance";
import React, { useEffect, useState } from "react";
type AdminUser = {
  _id: string;
  name: string;
  role: string;
};

type AdminUserList = AdminUser[];
export const AdminUserList = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUserList>([]);
  const fetchAdminData = async () => {
    try {
      const response = await instance.get("/adminUsers");
      //   console.log(response.data.user, "response in AdminSettings");
      setAdminUsers(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (_id: string) => {
    try {
      const res = await instance.delete(`/deleteAdminUser/${_id}`);
      alert(res.data.message);
    } catch (error) {
      alert("Устгахад алдаа гарлаа");
    }
  };

  return (
    <div className="text-stone-500">
      <div className="w-[320px] bg-white rounded-lg p-4">
        <div className="flex justify-between text-lg font-bold pb-2">
          <p>Нэр</p>
          <p>Үүрэг</p>
          <p></p>
        </div>
        <hr />
        {adminUsers.map((user, userIndex) => (
          <div className="flex justify-between text-sm mt-2">
            <div key={userIndex} className="w-[60px]">
              {user.name}:
            </div>
            <div className="w-[100px] flex justify-start">{user.role}</div>
            <i
              className="fa-solid fa-trash-can cursor-pointer"
              onClick={() => {
                handleDeleteUser(user._id);
              }}></i>
          </div>
        ))}
      </div>
    </div>
  );
};
