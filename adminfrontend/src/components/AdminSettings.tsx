/** @format */

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthenticationContext";
import { SignUpUsers } from "../components/SignUpUsers";
import { useRouter } from "next/router";
import { LogOutModal } from "./sub_components/LogOutModal";

type AdminUserData = {
  name: string;
  email: string;
};

export const AdminSettings = () => {
  const { adminUser } = useContext(AuthContext);
  const [showSignUp, setShowSignUp] = useState(false);
  const [adminUserData, setAdminUserData] = useState<AdminUserData | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAdminUserData(adminUser);
  }, [adminUser]);

  const handleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const handleLogOutModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal && (
        <div>
          <LogOutModal handleLogOutModal={handleLogOutModal} />
        </div>
      )}
      <div className="w-[1100px] h-[100px] bg-white m-auto mt-10 flex justify-between items-center p-6 rounded-lg text-stone-500">
        <div>
          <div className="text-md font-bold">
            Админ:{" "}
            <span className="text-sm font-normal">
              {adminUserData && adminUserData.name}
            </span>
          </div>
          <div className="text-md font-bold">
            Админ имэйл:{" "}
            <span className="text-sm font-normal">
              {adminUserData && adminUserData.email}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={handleSignUp}
            className="border border-stone-300 px-4 py-1 rounded-lg hover:bg-stone-400 hover:text-white duration-300 active:scale-95">
            Шинээр админ үүсгэх
          </button>
        </div>
        <div>
          <button
            onClick={handleLogOutModal}
            className="border border-stone-300 px-4 py-1 rounded-lg hover:bg-stone-400 hover:text-white duration-300 active:scale-95">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Системээс
            гарах
          </button>
        </div>
      </div>
      {showSignUp && <SignUpUsers />}
    </div>
  );
};
