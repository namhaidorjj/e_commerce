/** @format */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import { instance } from "@/utils/instance";
import { toastifyError, toastifyInfo, toastifySuccess } from "@/utils/alerts";
import { UserValueContext } from "@/contexts/UserContext";

export const Login = () => {
  const router = useRouter();
  const { signup } = useContext(UserValueContext);
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
        await signup({ user });
      } catch (error) {
        toastifyError("An error occurred. Please try again later.");
      }
    },
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <form onSubmit={formik.handleSubmit}>
        <div
          className={`${
            isMobile ? "bg-mobile" : "bg-desktop"
          } w-auto p-10 gap-14 flex flex-col justify-center items-center h-[800px] text-white bg-opacity-30 bg-black bg-center lg:bg-cover bg-blur-sm blur-sm relative`}></div>
        <div className="absolute lg:top-1/3 lg:left-1/4 top-20 left-[60px] flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-bold text-[20px]">EXISTING MEMBER </p>
            <p className="text-xs text-[17px]">Welcome Back!</p>
          </div>
          <div className="flex lg:flex-row flex-col gap-8 w-full lg:w-[800px] lg:blur-none">
            <div className="flex lg:w-1/2 flex-col gap-4">
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
              <div className="border-dashed border-b border-white" />
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
            <div className="flex lg:w-1/2 flex-col gap-4">
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
        </div>
      </form>
    </>
  );
};
