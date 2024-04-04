/** @format */
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { instance } from "@/utils/instance";
import * as Yup from "yup";
import { CartProps } from "@/utils/types/bagType";

export const SignSheet: React.FC<CartProps> = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email().required("required"),
    password: Yup.string().min(8, "багадаа  8 оронтой").required("reqiured"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required("reqiured"),
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const user = {
          email: values.email,
          password: values.password,
        };
        console.log(user);
        const res = instance.post("/createUser", { user });
        if ((await res).request.status === 201) {
          return router.push("./login");
        } else return alert("can't sighup");
      } catch (error) {
        console.log("error");
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onClick={formik.handleSubmit}>
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <p className="text.bold border-b">Register Now</p>
          </button>
        </SheetTrigger>
        <SheetContent>
          <div className="w-full h-full">
            <div className=" p-10 gap-14 flex flex-col right-0 text-white absolute h-full  bg-[#282828]">
              <div className="flex flex-col gap-2">
                <p className="text-bold text-[20px]">EXISTING MEMBER </p>
                <p className="text-xs text-[17px]">Welcome Back!</p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <img
                    className="w-4 h-4"
                    src="assets/icons/loginMail.svg"
                    alt=""
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    type="text"
                    placeholder="Enter Email"
                    className="outline-0 bg-opacity-30 bg-black w-full rounded-xl pl-4"
                  />
                </div>
                <div className=" border-dashed border-b border-white"></div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-4 h-4"
                    src="../assets/icons/lock.svg"
                    alt=""
                  />
                  <input
                    {...formik.getFieldProps("password")}
                    type="password"
                    placeholder="Enter Password"
                    className="outline-0 bg-opacity-30 bg-black w-full rounded-xl pl-4"
                  />
                </div>
                <div className=" border-dashed border-b border-white"></div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-4 h-4"
                    src="../assets/icons/lock.svg"
                    alt=""
                  />
                  <input
                    {...formik.getFieldProps("cpassword")}
                    type="password"
                    placeholder="Enter Re-Password"
                    className="outline-0 bg-opacity-30 bg-black w-full rounded-xl pl-4"
                  />
                </div>
                <div className=" border-dashed border-b border-white"></div>
              </div>
              <div className="w-full h-full justify-center items-center flex fexl-col">
                <button className="flex text-black w-[300px]  items-center justify-between pl-4 pr-4 rounded-3xl bg-white h-[50px]">
                  <p className="font-semibold">Create Account</p>
                  <img src="../assets/icons/rightArrowBlack.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </form>
  );
};
