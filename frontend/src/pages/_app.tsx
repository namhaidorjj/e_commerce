/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SearchValue } from "@/contexts/SearchValue";
import { ToastContainer, toast } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchValue>
      <ToastContainer
        position="top-right"
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
  );
}
