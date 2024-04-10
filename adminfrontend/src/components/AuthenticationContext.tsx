/** @format */

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { Loading } from "../components/sub_components/Loading";
import { instance } from "@/instance";

type AuthContextProps = {
  adminUser: any;
  login: (values: any) => Promise<void>;
};
type ErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};
type DecodedToken = {
  userId: string;
};

export const AuthContext = createContext<AuthContextProps>({
  adminUser: null,
  login: async () => {},
});
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const adminToken = localStorage.getItem("AdminToken");
    if (adminToken) {
      setToken(adminToken);
    } else {
      router.push("/login");
    }
  }, []);
  // Login scene ====
  const login = async (values: any) => {
    setLoading(true);
    try {
      const response = await instance.post("/loginAdmin", values);
      const token = response.data.token;
      localStorage.setItem("AdminToken", token);
      setToken(token);
      alert(response.data.message);
      router.push("/");
    } catch (error) {
      alert((error as ErrorType).response.data.message);
    } finally {
      setLoading(false);
    }
  };
  // Recieving token and Decoding action ===============================================
  useEffect(() => {
    const token = localStorage.getItem("AdminToken");
    if (!token) {
      router.replace("/login");
      return;
    }
    try {
      const tokenDecoded: DecodedToken = jwtDecode(token);
      if (tokenDecoded) {
        const userId = tokenDecoded.userId;
        fetchUserData(userId);
      } else {
        router.replace("/login");
      }
    } catch (error) {
      router.replace("/login");
    }
  }, [token]);
  // Fetching user data =================================
  const fetchUserData = async (userId: string) => {
    try {
      const response = await instance.get(`/adminUser/${userId}`);
      const userData = response.data.user;
      setAdminUser(userData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ adminUser, login }}>
      {loading ? (
        <div className="w-full h-screen bg-admin-cover bg-cover text-white">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Loading />
            <p>Нэвтэрч байна</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
