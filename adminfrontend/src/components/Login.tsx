/** @format */

import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "./AuthenticationContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LogIn = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Имэйл хаяг буруу байна")
        .required("Зайлшгүй бөглөнө"),
      password: Yup.string().required("Нууц үг шаардаж байна"),
    }),
    onSubmit: login,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-admin-cover bg-cover h-screen text-stone-500">
      <div className="h-[150px]"></div>
      <div className="w-[300px] bg-white p-6 rounded-lg m-auto">
        <div className="flex justify-center text-3xl font-bold mb-12">
          Нэвтрэх
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="" className="text-sm font-normal">
            Имэйл
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
          <div className="text-red-500 text-xs mb-4">
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>
          <br />
          <label htmlFor="" className="text-sm font-normal">
            Нууц үг
          </label>

          <br />
          <div className="flex gap-1 items-center">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="border w-full h-[48px] rounded placeholder:text-xs px-4"
              placeholder="Нууц үгээ оруулна уу"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {showPassword ? (
              <FaEyeSlash onClick={togglePasswordVisibility} />
            ) : (
              <FaEye onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className="text-red-500 text-xs mb-4">
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </div>
          <br />
          <div className="flex flex-col items-center gap-8 text-sm font-normal mb-8">
            <button
              type="submit"
              className={`border  h-[48px] w-full  rounded ${
                formik.isValid
                  ? "bg-stone-500 text-white hover:scale-[1.02] duration-200 active:scale-[0.98]"
                  : "text-[#1C20243D] bg-[#EEEFF2]"
              }`}
              disabled={!formik.isValid}>
              Нэвтрэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
