/** @format */

// import { Inter } from "next/font/google";
import { LeftNavBar } from "../components/LeftNavBar";
import { DashBoard } from "../components/DashBoard";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex bg-stone-200 w-screen h-screen">
      <LeftNavBar />
      <DashBoard />
    </div>
  );
}
