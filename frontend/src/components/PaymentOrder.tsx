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

export default function PaymentOrder({
  qr,
  pay,
  colorId,
}: {
  qr: string;
  pay: () => Promise<void>;
  colorId: string[];
}) {
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
      <DialogContent className="sm:max-w-[425px] bg-white">
        {qr && <Canvas text={qr} />}
        <DialogFooter className="">
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
