/** @format */
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import { LoginValidation } from "./user/LoginValidation";
import { SignUpSheet } from "./SignSheet";
import signup from "@/pages/signUp";

export const Login = () => {
  const router = useRouter();

  const signUp = () => {
    return router.push("./signup");
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidation,
    onSubmit: () => {},
  });
};



export function LoginSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button variant="outline">
          <img className="h-4 w-4" src="assets/icons/profile.svg" alt="" />
        </button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <div className="w-full h-full">
          <div className="p-10 gap-14 flex flex-col right-0 text-black absolute h-full ">
            <div className="flex flex-col gap-2">
              <p className="text-bold text-[20px]">EXISTING MEMBER </p>
              <p className="text-xs text-[17px]">Welcome Back!</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {/* <img className="w-6 h-6" src="assets/icons/loginMail.svg" alt="" /> */}
                <input
                  id="email"
                  type="text"
                  placeholder="Enter Email"
                  className="outline-0  h-10 bg-white w-full rounded-3xl pl-4"
                />
              </div>
              <div className=" border-dashed border-b border-black"></div>
              <div className="flex items-center gap-3">
                {/* <img className="w-6 h-6" src="assets/icons/lock.svg" alt="" /> */}
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  className="outline-0  h-10 bg-white w-full rounded-3xl pl-4"
                />
                <button>
                  <img
                    className="w-5 h-5"
                    src="assets/icons/openEYE.svg"
                    alt=""
                  />
                </button>
              </div>
              <div className=" border-dashed border-b border-black"></div>
            </div>
            <div className="w-full h-full justify-center items-center flex fexl-col">
              <button className="flex text-white w-[300px]  items-center justify-center hover:bg-black hover:opacity-70 shadow-2xl duration-700 pl-4 pr-4 rounded-3xl bg-black h-[50px]">
                <p className="font-semibold">Continue</p>
              </button>
            </div>

            <div className="flex  items-center w-full pl-10 pr-10 gap-1 h-full justify-center">
              <p className="border-b w-full"></p>
              <p>OR</p>
              <p className="border-b w-full"></p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button className="flex items-center justify-center w-[40px] h-[40px] border rounded-full">
                <img className="w-5 h-5" src="assets/icons/google.svg" alt="" />
              </button>
              <button className="flex items-center justify-center w-[40px] h-[40px] border rounded-full">
                <img
                  className="w-5 h-5"
                  src="assets/icons/facebook.svg"
                  alt=""
                />
              </button>
              <button className="flex items-center justify-center w-[40px] h-[40px] border rounded-full">
                <img className="w-5 h-5" src="assets/icons/apple.svg" alt="" />
              </button>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <button type="submit" className="flex gap-1 justify-center">
                  <p className="font-light">Didn't have account?</p>
                  <button onClick={signup}>Create Account</button>
                </button>
              </SheetClose>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
