/** @format */

import React from "react";
import  Header  from "../components/Header";
import { Footer } from "../components/Footer";
import { FaQMain } from "../components/faq/FaQMain";

export default function FaQ() {
  return (
    <div>
      <Header />
      <FaQMain />
      <Footer />
    </div>
  );
}
