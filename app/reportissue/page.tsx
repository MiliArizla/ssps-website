"use client";

import { useEffect, useState } from "react";

export default function Report() {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [dialog, setDialog] = useState(false);
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <main className=" flex min-h-screen py-10 flex-col px-24  mx-auto gap-6">
      <span className=" items-center text-center text-2xl">
        We are sorry you did not receive your spectrum!
      </span>
      <span className="items-center text-center text-xl">
        If you received an error email, try again and check that the parameters adhere to the requirements detailed in the manual.
        If you did not receive an error email, verify that your email is correct and check your inbox and spam folder again.
        You can also try to upload a file with the parameters according to the example file
        which you can download using the button next to the Upload File button.
        If your problem persists you can contact and us we will respond within 24 hours.
      </span>
      {/* <span className="items-center text-center text-2xl">
        If you did not receive an error email, there is a chance the email provided is incorrect. 
        If you did receive a error email, check that your spectrum is within the right limits.
      </span> */}
      <span className="items-center text-center text-3xl">
        If your problem persists, send us an email at sspswebsite@gmail.com
      </span>
      {/* <div className="flex-col flex w-full items-center gap-3 mt-5">
        <input
          className="w-1/2 self-start bg-indigo-900 rounded-full px-4 py-4 placeholder:text-white placeholder:text-center placeholder:font-bold"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="w-full bg-purple-900 rounded-full py-20 placeholder:text-white placeholder:text-center text-center placeholder:font-bold"
          placeholder="Describe your problem and the spectrum you need"
        ></input>
        <button
          className=" w-1/2 py-4 self-end bg-indigo-900 text-center font-bold rounded-full cursor-pointer"
          title="Send"
          onClick={() => setDialog(true)}
        >
          Send
        </button>
        {dialog && (
          <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center">
            <div className="bg-purple-900 rounded-full shadow-md p-3 w-[30%] relative">
              <div className="relative w-full">
                <h1 className="p-4 text-center relative ">
                  Your report was sent successfully! Check your email in the
                  next 24 hours.
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-7 h-7 absolute -right-3 -top-4 cursor-pointer hover:animate-spin"
                  onClick={() => setDialog(false)}
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </main>
  );
}
