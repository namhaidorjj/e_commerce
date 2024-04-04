/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContactVisiblity } from "../../contexts/ContactUs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContactVisiblity>
      <Component {...pageProps} />
    </ContactVisiblity>
  );
}
