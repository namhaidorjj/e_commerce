/** @format */

import React from "react";
import { Loading } from "../components/sub_components/Loading";

const Loadingpage = () => {
  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 pr-[300px]">
        <Loading />
        <div className="text-center text-stone-400">Түр хүлээнэ үү...</div>
      </div>
    </div>
  );
};
export default Loadingpage;
