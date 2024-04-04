/** @format */

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

type Variant = "outline";

interface CartProps {
  variant: Variant;
}

export const LoginSheet: React.FC<CartProps> = (): JSX.Element => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Error email failed").required("required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("required"),
    }),
    onSubmit: async (values) => {
      try {
        const user = {
          email: values.email,
          password: values.password,
        };
        console.log(user);
        const res = await axios.post("http://localhost:8080/user", {
          user,
        });
        if (res.status === 201) {
          return router.push("./login");
        } else return alert("can't signup");
      } catch (error) {
        console.log("error");
        alert("Sign Up");
      }
    },
  });



export function LoginSheet() {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
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
            <form
              onSubmit={formik.handleSubmit}
              className="flex w-auto flex-col gap-4 items-center justify-center">
              <div className="flex w-auto items-center gap-3">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter Email"

                  className="outline-0 bg-opacity-30 h-10 bg-black w-[300px] rounded-3xl pl-4"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className=" border-dashed w-[300px] border-b border-white" />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}

              <div className="flex items-center gap-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"

                  className="outline-0 bg-opacity-30 h-10 bg-black w-[280px] rounded-3xl pl-4"
                  onChange={formik.handleChange}
                  value={formik.values.password}

                />
                <button>
                  <img
                    className="w-5 h-5"
                    src="assets/icons/openEYE.svg"
                    alt=""
                  />
                </button>
              </div>

              <div className="w-[300px] border-dashed border-b border-white" />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
              <SheetClose
                asChild
                className="w-full h-full justify-center items-center flex fexl-col p-2 mt-[100px]">
                <button className="flex text-black w-[300px]  items-center justify-between pl-4 pr-4 rounded-3xl bg-white h-[50px]">
                  <p className="font-semibold">Continue</p>
                  <img src="assets/icons/rightArrowBlack.svg" alt="" />
                </button>
              </SheetClose>
            </form>

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
                <button className="flex gap-1 justify-center">
                  <p className="font-light">Didn't have account?</p>
                  <button>Create Account</button>
                </button>
              </SheetClose>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
