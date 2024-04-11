/** @format */
/** @format */

import { instance } from "@/utils/instance";
import { useState } from "react";
import { useQRCode } from "next-qrcode";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toastifyError, toastifySuccess } from "@/utils/alerts";
import { Link } from "lucide-react";
import { bank } from "@/utils/types/bagType";

export default function PaymentOrder({
  qr,
  pay,
  colorId,
  bank,
}: {
  qr: string;
  pay: () => Promise<void>;
  colorId: string[];
  bank: bank;
}) {
  console.log("hey", bank);
  const { Canvas } = useQRCode();
  const check = async () => {
    const checkRes = await instance.post("/check", {
      invoiceId: localStorage.getItem("invoiceId"),
      token: localStorage.getItem("paymentToken"),
    });
    if (checkRes.data.check.rows.length == 0) {
      toastifyError("Not paid");
    } else {
      await instance.post("/updateOrderPayment", colorId);
      toastifySuccess("Paid");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={pay}
          type="submit"
          className="w-full rounded-2xl btn items-center justify-center border border-spacing-1 bg-zinc-800 p-1 text-white">
          Bought bag
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  bg-white w-full justify-centers">
        <div className="flex gap-2 items-center">
          {qr && <Canvas text={qr} />}
          <div className="grid grid-cols-4 gap-2 justify-center items-center  ">
            {bank?.urls?.map((data) => (
              <a href={data?.link}>
                <img className="w-10 h-10" src={data?.logo} alt="" />
              </a>
            ))}
          </div>
        </div>
        <DialogFooter>
          <button
            className="p-2 rounded-xl bg-black text-center text-white w-full"
            onClick={check}>
            Check Payment
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
