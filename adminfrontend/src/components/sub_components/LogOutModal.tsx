/** @format */

import React from "react";
import { useRouter } from "next/router";

type LogOutModalProps = {
  handleLogOutModal: () => void;
};

export const LogOutModal: React.FC<LogOutModalProps> = ({
  handleLogOutModal,
}) => {
  const router = useRouter();

  const closeLogOutModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains("bg-back-color")) {
      handleLogOutModal();
    }
  };
  const closeModal = () => {
    handleLogOutModal();
  };

  const handleLogOut = () => {
    localStorage.removeItem("AdminToken");
    router.push("/login");
  };

  return (
    <div className="text-stone-500">
      <div
        onClick={closeLogOutModal}
        className="w-full h-full bg-back-color fixed z-50 px-[350px]">
        <div className="w-[384px] h-[200px] bg-white mt-[200px] rounded-2xl">
          <div className="flex items-center justify-center h-[167px] w-[230px] m-auto text-center">
            Та системээс гарахдаа итгэлтэй байна уу?
          </div>
          <div className="h-[61px]">
            <button
              onClick={handleLogOut}
              className="w-[192px] bg-stone-200 h-[61px] text-stone-500 hover:bg-stone-500 hover:text-white rounded-bl-2xl duration-200">
              Тийм
            </button>
            <button
              onClick={closeModal}
              className="w-[192px] bg-stone-200 h-[61px] text-stone-500 hover:bg-stone-500 hover:text-white rounded-br-2xl duration-200">
              Үгүй
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
