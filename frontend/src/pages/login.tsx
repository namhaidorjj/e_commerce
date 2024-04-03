/** @format */

import { useRouter } from "next/router";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Login } from "@/components/user/Login";

export default function login() {
  return (
    <div>
      <Login />
    </div>
  );
}
