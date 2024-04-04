/** @format */

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";
import { Footer } from "../Footer";
import { instance } from "@/instance";

export const Login = () => {
  const [visible, setVisible] = useState(0);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      requiredCode: "",
    },
    validationSchema: Yup.object({
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
      requiredCode: Yup.number().min(6).required(),
    }),
    onSubmit: async (values) => {
      try {
        const code = values.requiredCode;
        const res = await instance.post("http://localhost:8080/createUser", {
          code,
        });
        alert("Unable to sign up. Please try again.");
        try {
          const user = {
            email: values.email,
            password: values.password,
            userName: values.userName,
            address: values.address,
            phoneNumber: values.phoneNumber,
          };

          console.log(user);
          const res = await axios.post("http://localhost:8080/createUser", {
            user,
          });
          if (res.status === 201) {
            return router.push("./login");
          } else {
            alert("Unable to sign up. Please try again.");
          }
        } catch (error) {
          alert("An error occurred. Please try again later.");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    },
  });
  const handleNext = () => {
    setVisible(visible + 1);
  };
  const sendMail = async () => {
    const email = formik.values.email;
    const res = await instance.post("http://localhost:8080/createUser", {
      email,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header />
      <div className="w-auto p-10 gap-14 flex flex-col justify-center items-center text-white bg-opacity-30 bg-black">
        <div className="flex flex-col gap-2">
          <p className="text-bold text-[20px]">EXISTING MEMBER </p>
          <p className="text-xs text-[17px]">Welcome Back!</p>
        </div>
        {visible === 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter Email"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <div className="flex items-center gap-3">
              <input
                type="password"
                placeholder="Enter Password"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <div className="flex items-center gap-3">
              <input
                type="password"
                placeholder="Confirm Password"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}
            <div className="w-full h-full justify-center items-center flex fexl-col">
              <button
                onClick={handleNext}
                className="flex text-black w-[300px]  items-center justify-between pl-4 pr-4 rounded-3xl bg-white h-[50px]">
                <p className="font-semibold">Next</p>
                <img src="assets/icons/rightArrowBlack.svg" alt="" />
              </button>
            </div>
          </div>
        )}
        {visible === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <input
                type="userName"
                placeholder="User Name"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.userName && formik.errors.userName ? (
              <div>{formik.errors.userName}</div>
            ) : null}
            <div className="flex items-center gap-3">
              <input
                type="phoneNumber"
                placeholder="Phone Number"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div>{formik.errors.phoneNumber}</div>
            ) : null}
            <div className="flex items-center gap-3">
              <input
                type="address"
                placeholder="Address"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.address && formik.errors.address ? (
              <div>{formik.errors.address}</div>
            ) : null}
            <div className="w-full h-full justify-center items-center flex fexl-col">
              <button
                onClick={() => {
                  handleNext();
                  sendMail();
                }}
                className="flex text-black w-[300px]  items-center justify-between pl-4 pr-4 rounded-3xl bg-white h-[50px]">
                <p className="font-semibold">Next</p>
                <img src="assets/icons/rightArrowBlack.svg" alt="" />
              </button>
            </div>
          </div>
        )}
        {visible === 3 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <input
                type="userName"
                placeholder="User Name"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.userName && formik.errors.userName ? (
              <div>{formik.errors.userName}</div>
            ) : null}
            <div className="flex items-center gap-3">
              <input
                type="phoneNumber"
                placeholder="Phone Number"
                className="outline-0 bg-opacity-30 h-10 bg-black w-full rounded-3xl pl-4"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </div>
            <div className=" border-dashed border-b border-white"></div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div>{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
        )}
      </div>
      <Footer />
    </form>
  );
};
