/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SearchValue } from "@/contexts/SearchValue";
import { UserValue } from "@/contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserValue>
      <SearchValue>
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </SearchValue>
    </UserValue>
  );
}
