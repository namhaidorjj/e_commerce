/** @format */
import React from "react";
import { useRouter } from "next/router";
export const BrandsCard = () => {
  const router = useRouter();
  const handleJumpHermes = () => {
    router.push("bag/hermes");
  };
  const handleJumpGucci = () => {
    router.push("bag/gucci");
  };
  const handleJumpPrada = () => {
    router.push("bag/prada");
  };
  const handleJumpLouisVuitton = () => {
    router.push("bag/LouisVuitton");
  };
  return (
    <div>
      <div className=" flex justify-center p-32 gap-16">
        <div className="flex flex-col relative justify-center items-center gap-4 ">
          <div className="relative  flex flex-col justify-center items-center ">
            <img
              className="w-[300px] h-[400px] rounded-xl "
              src="/assets/Hermes.jpeg"
              alt=""
            />
            <div className="absolute inset-0 flex justify-center font-mono text-base items-end text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="absolute bottom-14 p-2">
                <div
                  onClick={handleJumpHermes}
                  className="border p-5 w-[150px] bg-black bg-opacity-30  hover:bg-opacity-70 flex justify-center items-center cursor-pointer rounded-md transform translate-y-1 transition duration-700">
                  Shop Now
                </div>
              </div>
            </div>
          </div>
          <p className="w-[100px] text-black top-2 left-4 absolute h-[40px] text-2xl">
            𝓗𝑒𝓇𝓂𝑒𝓈
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center gap-4 ">
          <div className="relative  flex flex-col justify-center items-center ">
            <img
              className="w-[300px] h-[400px] rounded-xl "
              src="/assets/Prada.jpeg"
              alt=""
            />
            <div className="absolute inset-0 flex justify-center font-mono text-base items-end text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className=" absolute bottom-14 p-2">
                <div
                  onClick={handleJumpPrada}
                  className="border p-5 w-[150px] bg-black bg-opacity-30  hover:bg-opacity-70 flex justify-center items-center cursor-pointer rounded-md transform translate-y-1 transition duration-700">
                  Shop Now
                </div>
              </div>
            </div>
          </div>
          <p className="w-[100px] text-black top-2 left-4 absolute h-[40px] text-2xl">
            ꝒⱤ𐤠Ɗ𐤠
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center gap-4 ">
          <div className="relative  flex flex-col justify-center items-center ">
            <img
              className="w-[300px] h-[400px] rounded-xl "
              src="/assets/louisVuitton.jpeg"
              alt=""
            />
            <div className="absolute inset-0 flex justify-center font-mono text-base items-end text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className=" absolute bottom-14 p-2">
                <div
                  onClick={handleJumpLouisVuitton}
                  className="border p-5 w-[150px] bg-black bg-opacity-30  hover:bg-opacity-70 flex justify-center items-center cursor-pointer rounded-md transform translate-y-1 transition duration-700">
                  Shop Now
                </div>
              </div>
            </div>
          </div>
          <p className="w-[100px] text-black top-2 left-4 absolute h-[40px] text-2xl">
            𝕃𝕠𝕦𝕚𝕤 𝕍𝕦𝕚𝕥𝕥𝕠𝕟
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center gap-4 ">
          <div className="relative  flex flex-col justify-center items-center ">
            <img
              className="w-[300px] h-[400px] rounded-xl "
              src="/assets/gucci.jpeg"
              alt=""
            />
            <div className="absolute inset-0 flex justify-center font-mono text-base items-end text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className=" absolute bottom-14 p-2">
                <div
                  onClick={handleJumpGucci}
                  className="border p-5 w-[150px] bg-black bg-opacity-30  hover:bg-opacity-70 flex justify-center items-center cursor-pointer rounded-md transform translate-y-1 transition duration-700">
                  Shop Now
                </div>
              </div>
            </div>
          </div>
          <p className="w-[100px] text-black top-2 left-4 absolute h-[40px] text-2xl">
            𝒢𝓊𝒸𝒸𝒾
          </p>
        </div>
      </div>
    </div>
  );
};
