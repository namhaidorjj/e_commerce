/** @format */

import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { LoginValidation } from "./LoginValidation";
import axios from "axios";

export const SignUp = () => {
  const router = useRouter();

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: LoginValidation,
    onSubmit: () => {},
  });

  const createUser = async () => {
    try {
      const user = {
        email: values.email,
        password: values.password,
      };
      console.log(user);
      const res = axios.post("http://localhost:8080/createUser", { user });
      if ((await res).request.status === 201) {
        return router.push("./login");
      } else return alert("can't sighup");
    } catch (error) {
      console.log("error");

    }
  };

  return (
    <div className="w-full h-full">
      <img className="absolute w-full h-full" src="assets/profile.jpg" alt="" />
      <div className="w-1/3 pt-10 left-10 pl-36 text-white h-min-screen absolute">
        <div>
          <p>BagHouse</p>
        </div>
        <div className="pt-52">
          <p className="text-2xl pb-2 font-bold">SHOP</p>
          <div className="flex flex-col gap-2">
            <div className=" flex  gap-2">
              <p>Brands</p>
            </div>
            <div className="opacity-60 flex flex-col gap-2">
              <p>Hermes</p>
              <p>Gucci</p>
              <p>Prada</p>
              <p>LouisVuitton</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-10 gap-14 flex flex-col right-0 text-white absolute h-full bg-opacity-30 bg-black">
        <div className="flex justify-end w-full">
          <button className="flex items-center justify-center border rounded-xl w-[40px] h-[40px]">
            <img className="fill-white	" src="assets/icons/close.svg" alt="" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-bold text-[20px]">EXISTING MEMBER </p>
          <p className="text-xs text-[17px]">Welcome Back!</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img className="w-4 h-4" src="assets/icons/loginMail.svg" alt="" />
            <input
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Email"
              className="outline-0 bg-opacity-30 bg-black w-full rounded-xl pl-4"
            />
          </div>
          <div className=" border-dashed border-b border-white"></div>
          <div className="flex items-center gap-3">
            <img className="w-4 h-4" src="assets/icons/lock.svg" alt="" />
            <input
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Enter Password"
              className="outline-0 bg-opacity-30 bg-black w-full rounded-xl pl-4"
            />
          </div>
          <div className=" border-dashed border-b border-white"></div>
          <div className="flex items-center gap-3">
            <img className="w-4 h-4" src="assets/icons/lock.svg" alt="" />
            <input
              id="cpassword"
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Enter Re-Password"
              className="outline-0 bg-opacity-30 bg-black w-full rounded-xl pl-4"
            />
          </div>
          <div className=" border-dashed border-b border-white"></div>
        </div>
        <div className="w-full h-full justify-center items-center flex fexl-col">
          <button
            onClick={createUser}
            className="flex text-black w-[300px]  items-center justify-between pl-4 pr-4 rounded-3xl bg-white h-[50px]">
            <p className="font-semibold">Create Account</p>
            <img src="assets/icons/rightArrowBlack.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
