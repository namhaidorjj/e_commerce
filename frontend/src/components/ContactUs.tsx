/** @format */

import React, { useState } from "react";
import Header from "./Header";
import { Footer } from "./Footer";

export const ContactUs = () => {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSend = () => {
    const inputData = {
      firstname,
      lastName,
      areaCode,
      phoneNumber,
      message,
      selectedSubject,
    };

    setFirstName("");
    setLastName("");
    setAreaCode("");
    setPhoneNumber("");
    setMessage("");
    setSelectedSubject("");
  };
  return (
    <div className=" flex flex-col justify-center items-center">
      <Header />
      <div className="  flex flex-col  border ">
        <div>
          <p className="p-12 text-4xl"> Contact Us</p>
          <hr />
        </div>
        <div className=" flex flex-col p-12 gap-6">
          <div>
            <p>Customer Service</p>
            <p className=" text-sm">Call : 800-441-4488</p>
            <p className=" text-xs">Monday to Friday: 9am - 9pm EST</p>
            <p className=" text-xs">Saturday: 10am - 9pm EST</p>
          </div>
          <div>
            <p className=" text-sm">
              Have a question? You may find an answer in our FAQs.
            </p>
            <p className=" text-sm">But you can also contact us:</p>
          </div>
        </div>
        <div className=" flex flex-col p-12 gap-6">
          <div className=" flex  gap-8">
            <input
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="outline-0  w-[700px] border p-2 hover:border-black"
              placeholder=" First Name"
              type="text"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="outline-0  w-[700px] border p-2 hover:border-black"
              placeholder=" Last Name"
              type="text"
            />
          </div>
          <div className="outline-0 flex items-center">
            <input
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
              className=" p-2  border hover:border-black "
              placeholder="Area Code"
            />
            <span className=" p-2">-</span>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className=" w-full border p-2 hover:border-black"
              placeholder=" Phone Number"
              type="text"
            />
          </div>
          <select
            className="w-full border p-2 hover:border-black"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}>
            <option disabled hidden value="">
              Please select subject.
            </option>
            <option value="Lorem ipsum dolor sit amet.">
              Lorem ipsum dolor sit amet.
            </option>
            <option value="Lorem ipsum dolor sit amet.">
              Lorem ipsum dolor sit amet.
            </option>
            <option value="Lorem ipsum dolor sit amet.">
              Lorem ipsum dolor sit amet.
            </option>
            <option value="Lorem ipsum dolor sit amet.">
              Lorem ipsum dolor sit amet.
            </option>
          </select>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-[100px] p-2 border hover:border-black"
            placeholder="Your message"></textarea>
        </div>
        <div className=" flex justify-between pl-12 pr-12 pb-12">
          <p className=" w-1/2">
            By sending your message, you agree to accept the General Terms and
            Conditions of Use and that your data will be processed in compliance
            with the Privacy Policy of ...
          </p>
          <div
            onClick={handleSend}
            className=" hover:cursor-pointer p-3 bg-zinc-800 text-white text-sm w-[200px] flex justify-center items-center rounded-md">
            Send
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
