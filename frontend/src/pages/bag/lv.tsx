/** @format */

import React from "react";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import { InProgress } from "@/components/InProgress";

export default function louisVuitton() {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="h-min-screen w-min-screen">
        <InProgress />
      </div>
      <Footer />
    </div>
  );
}
