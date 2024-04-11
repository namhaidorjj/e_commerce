/** @format */

import { instance } from "@/utils/instance";
import { User } from "@/utils/types/bagType";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { UserValueContext } from "@/contexts/UserContext";

export const Unsubscribe = ({
  toggleVisible,
}: {
  toggleVisible: () => void;
}) => {
  const { user } = useContext(UserValueContext);
  const fetchData = async () => {
    if (user) {
      try {
        await instance.delete(`/deleteUser/${user}`);
        alert("User deleted success");
      } catch (error) {
        console.error(error);
        alert("Please try again");
      }
    }
  };
  useEffect(() => {
    fetchData;
  }, []);
  return (
    <div className="lg:w-1/3 w-full py-20 bg-gray-200 rounded-xl flex flex-col justify-center items-center gap-14">
      <p className="text-lg">Are really sure to unsubscribe email?</p>
      <div className="flex gap-6">
        <button
          onClick={fetchData}
          className="bg-black px-6 py-4 text-white rounded-lg">
          YES!
        </button>
        <button
          onClick={toggleVisible}
          className="bg-black px-6 py-4 text-white rounded-lg">
          NO
        </button>
      </div>
    </div>
  );
};
