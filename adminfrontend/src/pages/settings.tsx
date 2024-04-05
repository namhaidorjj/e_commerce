/** @format */

import React from "react";
import { LeftNavBar } from "../components/LeftNavBar";
import { SignUpUsers } from "../components/SignUpUsers";
import { AdminSettings } from "../components/AdminSettings";

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
