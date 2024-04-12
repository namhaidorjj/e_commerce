/** @format */

import { instance } from "@/utils/instance";
import { User } from "@/utils/types/bagType";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, createContext, ReactNode } from "react";
import Cookies from "js-cookie";
import { toastifyError, toastifySuccess } from "@/utils/alerts";
import { useRouter } from "next/router";

type UserValueType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userData: () => void;
  signin: (data: any) => Promise<void>;
  signup: (data: any) => Promise<boolean | undefined>;
};

const initialValue = {
  user: "",
  setUser: () => {},
  userData: () => {},
  signin: (data: any) => {
    return data;
  },
  signup: (data: any) => {
    return data;
  },
};

type ChildrenType = {
  children: ReactNode;
};

export const UserValueContext = createContext<UserValueType>(initialValue);

export const UserValue = ({ children }: ChildrenType) => {
  const router = useRouter();
  const [user, setUser] = useState<string>("");

  const userData = async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded.id);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const signin = async (data: any) => {
    try {
      const response = await instance.post("signin", { data });
      if (response.status === 200) {
        const { accessToken } = response.data;
        toastifySuccess("Successfully enter");
        Cookies.set("accessToken", accessToken);
      } else {
        throw new Error("Signin failed");
      }
    } catch (error) {
      toastifyError("Please check your Username or Password");
    }
  };
  const signup = async (data: any) => {
    try {
      const res = await instance.post("/createUser", {
        data,
      });
      if (res.status === 200) {
        const { accessToken } = res.data;
        toastifySuccess("Successfully enter");
        Cookies.set("accessToken", accessToken);
        return router.push("/");
      } else {
        throw new Error("Signin failed");
      }
    } catch (error) {
      toastifyError("An error occurred. Please try again later.");
    }
  };
  useEffect(() => {
    user;
  }, []);

  return (
    <UserValueContext.Provider
      value={{ user, setUser, signin, signup, userData }}>
      {children}
    </UserValueContext.Provider>
  );
};
