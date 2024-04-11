/** @format */

import React from "react";
import { LeftNavBar } from "../components/LeftNavBar";
import { AdminSettings } from "../components/AdminSettings";
import { AdminUserList } from "../components/AdminUserList";

const Settings = () => {
  return (
    <div className="flex">
      <LeftNavBar />
      <div className="bg-stone-200 w-screen">
        <AdminSettings />
      </div>
    </div>
  );
};
export default Settings;
