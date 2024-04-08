/** @format */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../Header";
import { Footer } from "../Footer";
import { instance } from "@/utils/instance";

export const Login = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    userName: Yup.string().min(2).max(30).required(),
    phoneNumber: Yup.string().required(),
    address: Yup.string().required(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const user = {
          email: values.email,
          password: values.password,
          userName: values.userName,
          address: values.address,
          phoneNumber: values.phoneNumber,
        };
        const res = await instance.post("/createUser", {
          user,
        });
        if (res.status === 200) {
          alert("Successfulle enter");
          return router.push("/");
        } else {
          alert("Unable to sign up. Please try again.");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    },
  });

  return (
    <>
      <Header />
      <form
        onSubmit={formik.handleSubmit}
        className="w-auto p-10 gap-14 flex flex-col justify-center items-center text-white bg-opacity-30 bg-black">
        <div className="flex flex-col gap-2">
          <p className="text-bold text-[20px]">EXISTING MEMBER </p>
          <p className="text-xs text-[17px]">Welcome Back!</p>
        </div>
        <div className="flex gap-8 w-[800px]">
          <div className="flex w-1/2 flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm self-start">User name :</p>
              <input
                type="text"
                id="userName"
                placeholder="User Name"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white" />
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm self-start">Phone Number :</p>
              <input
                type="number"
                id="phoneNumber"
                placeholder="Phone Number"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </div>
            <div className="border-dashed border-b border-white" />
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm self-start">Address :</p>
              <input
                type="text"
                id="address"
                placeholder="Address"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm self-start">Email :</p>
              <input
                type="text"
                id="email"
                placeholder="Enter Email"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="border-dashed border-b border-white" />
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm self-start">Password :</p>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className="border-dashed border-b border-white" />
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm self-start">Confirm Password :</p>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex text-black w-[300px] btn items-center justify-between px-4 rounded-3xl bg-white h-[50px] hover:scale-105">
          <p className="font-semibold">Confirm</p>
          <img src="../assets/icons/rightArrowBlack.svg" alt="" />
        </button>
      </form>
      <Footer />
    </>
  );
};
