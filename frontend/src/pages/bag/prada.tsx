/** @format */

<<<<<<< HEAD
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import GucciMain from "@/components/gucci/GucciMain";

const prada = () => {
  return (
    <div>
      <Header />
      <GucciMain />
      <Footer />
    </div>
  );
};

export default prada;
=======
import React from "react";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import { InProgress } from "@/components/InProgress";

export default function prada() {
  return (
    <div>
      <Header />
      <InProgress />
      <Footer />
    </div>
  );
}
>>>>>>> main
