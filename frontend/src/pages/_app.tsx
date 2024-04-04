/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SearchValue } from "@/contexts/SearchValue";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchValue>
      <Component {...pageProps} />
    </SearchValue>
  );
}
