"use client";

import { useState } from "react";

export default function Report() {
  const [email, setEmail] = useState("");
  return (
    <main className=" flex min-h-screen py-10 flex-col px-24  mx-auto gap-6">
      <span className=" items-center text-center text-2xl">
        We are sorry you did not receive your spectrum!
      </span>
      <span className=" items-center text-center text-xl">
        Try again and check if the parameters are according to the info
        provided, check your email and your spam again, and check if you wrote
        your email correctly, or try to upload a file with the parameters
        according to the example that we have on the download option right next
        to the Upload File button. If your problem persists you can contact us
        we will respond within 24h.
      </span>
      <div className="flex-col flex w-full items-center gap-3 mt-5">
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
          className=" w-1/2 py-4 self-end bg-indigo-900 text-center font-bold rounded-full"
          title="Send"
        >
          Send
        </button>
      </div>
    </main>
  );
}
