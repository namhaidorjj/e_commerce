/** @format */

import { UserHistory } from "@/components/user/UserHistory";
import React from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const userHistory = () => {
  return (
    <>
      <Header />
      <div>
        <UserHistory />
      </div>
    </>
  );
};

export default userHistory;
