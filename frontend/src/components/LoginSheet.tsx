/** @format */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { instance } from "@/utils/instance";
import { CartProps } from "@/utils/types/bagType";
import { toastifyError, toastifySuccess } from "@/utils/alerts";

export const LoginSheet: React.FC<CartProps> = (): JSX.Element => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().email("Error email failed").required("required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await instance.post("signin", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 201) {
          const { accessToken } = response.data;
          toastifySuccess("Successfully enter");
          document.cookie = `accessToken=${accessToken}; Path=/; SameSite=Strict`;
        } else {
          throw new Error("Signin failed");
        }
      } catch (error) {
        toastifyError("Please check your Username or Password");
      }
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <img className="h-4 w-4" src="/assets/icons/profile.svg" alt="" />
        </button>
      </SheetTrigger>
      <SheetContent className="bg-white w-screen">
        <div className="w-full h-full">
          <div className="flex justify-center pt-4 items-center">
            <img className="w-[150px] h-[100px]" src="../loogo.jpg" alt="" />
          </div>
          <div className="p-10 gap-14 flex flex-col right-0 text-black absolute h-full ">
            <div className="flex flex-col gap-2">
              <p className="text-bold text-[20px]">EXISTING MEMBER </p>
              <p className="text-xs text-[17px]">Welcome Back!</p>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex w-auto flex-col gap-4 items-center justify-center">
              <div className="flex flex-col w-auto items-center gap-3">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter Your Email"
                  className="outline-0 h-10 border w-[300px] rounded-3xl pl-4"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <p className="border-dashed border-b w-full"></p>
              </div>
              <div className=" border-dashed w-[300px] border-b border-white" />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
              <div className="flex flex-col items-center gap-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="outline-0 bg-opacity-30 border h-10 w-[300px] rounded-3xl pl-4"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <p className="border-dashed border-b w-full"></p>
              </div>
              <div className="w-[300px] border-dashed border-b border-white" />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
              <SheetClose
                asChild
                className="w-full h-full justify-center items-center flex fexl-col p-2 mt-[100px]">
                <button
                  type="submit"
                  className="flex border border-spacing-6 text-black w-[300px]  items-center gap- p-3 hover:bg-black hover:text-white cursor-pointer rounded-3xl bg-white h-[50px]">
                  <p className="font-semibold">Continue</p>
                  <img src="/assets/icons/rightArrowBlack.svg" alt="" />
                </button>
              </SheetClose>
            </form>
            <SheetFooter>
              <SheetClose asChild>
                <button className="flex gap-1 pr-5 justify-center">
                  <p className="font-light">Didn't have account?</p>
                  <a href="./login">Create Account</a>
                </button>
              </SheetClose>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
