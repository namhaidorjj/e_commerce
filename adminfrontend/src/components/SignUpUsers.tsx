/** @format */

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Loading } from "../components/sub_components/Loading";

type ErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};

export const SignUpUsers = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "15 тэмдэгтээс дээшгүй байна")
        .required("Зайлшгүй бөглөнө"),
      email: Yup.string()
        .email("Буруу имэйл хаяг байна")
        .required("Зайлшгүй бөглөнө"),
      phone: Yup.number().required("Зайлшгүй бөглөнө"),
      password: Yup.string()
        .min(4, "4 тэмдэгтээс доошгүй байна")
        .required("Зайлшгүй бөглөнө"),
      rePassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), undefined],
          '"Нууц үг"-тэй ямагт таарах ёстой'
        )
        .required("Нууц үгээ давтана уу"),
      role: Yup.string().required("Үүргийг нь оруулна уу"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const userData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          role: values.role,
        };
        const response = await axios.post(
          "http://localhost:8080/createAdminUser",
          userData
        );
        alert(response.data.message);
        formik.resetForm();
      } catch (error) {
        console.error("Error:", error);
        alert((error as ErrorType).response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen flex-col">
          <Loading />
          <div>Шинэ админ бүртгэж байна</div>
        </div>
      ) : (
        <div className="w-[400px] m-auto my-10 bg-white p-6 text-stone-500 rounded-lg">
          <div className="flex justify-center text-3xl font-bold mb-12">
            Шинэ Админ бүртгэх
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <label htmlFor="" className="text-sm font-normal">
              Нэр:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="border w-full h-[48px] rounded placeholder:text-xs px-4"
              placeholder="Нэрээ оруулна уу"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <div className="text-red-500 mb-4 text-xs">
              {formik.touched.name && formik.errors.name ? (
                <p>{formik.errors.name}</p>
              ) : null}
            </div>
            <label htmlFor="" className="text-sm font-normal">
              Имэйл:
            </label>
            <br />
            <input
              id="email"
              name="email"
              type="text"
              className="border w-full h-[48px] rounded placeholder:text-xs px-4"
              placeholder="Имэйл хаягаа оруулна уу"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="text-red-500 text-xs">
              {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
            </div>
            <br />
            <label htmlFor="" className="text-sm font-normal">
              Утас:
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="border w-full h-[48px] rounded placeholder:text-xs px-4"
              placeholder="Утасны дугаар оруулна уу"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <div className="text-red-500 mb-4 text-xs">
              {formik.touched.phone && formik.errors.phone ? (
                <p>{formik.errors.phone}</p>
              ) : null}
            </div>
            <label htmlFor="" className="text-sm font-normal">
              Нууц үг:
            </label>
            <br />
            <input
              id="password"
              name="password"
              type="text"
              className="border w-full h-[48px] rounded placeholder:text-xs px-4"
              placeholder="Нууц үгээ оруулна уу"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="text-red-500 text-xs mb-4">
              {formik.touched.password && formik.errors.password ? (
                <p>{formik.errors.password}</p>
              ) : null}
            </div>
            <br />
            <label htmlFor="" className="text-sm font-normal">
              Нууц үг давтах:
            </label>
            <br />
            <input
              id="rePassword"
              name="rePassword"
              type="text"
              className="border w-full h-[48px] rounded placeholder:text-xs px-4"
              placeholder="Нууц үгээ оруулна уу"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
            />
            <div className="text-red-500 mb-4 text-xs">
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <p>{formik.errors.rePassword}</p>
              ) : null}
            </div>
            <label htmlFor="role" className="text-sm font-normal">
              Үүрэг:
            </label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border w-full h-[48px] rounded optional:text-xs px-4">
              <option value="">Үүрэг сонгож өгнө үү</option>
              <option value="Super_Admin">Супер админ</option>
              <option value="Create_Admin">Бүтээгдэхүүн үүсгэх админ</option>
              <option value="Update_Admin">Бүтээгдэхүүн шинэчлэх админ</option>
              <option value="View_Admin">Хянах админ</option>
            </select>
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500 text-xs">{formik.errors.role}</div>
            ) : null}
            <br />
            <button
              type="submit"
              disabled={!formik.isValid}
              className={`border w-full h-12 rounded mt-10 ${
                formik.isValid
                  ? "bg-stone-500 text-white hover:scale-[1.02] duration-200 active:scale-[0.98]"
                  : "bg-[#EEEFF2] text-[#1C20243D]"
              }`}>
              Бүртгэх
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
