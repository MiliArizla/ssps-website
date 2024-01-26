"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [initialLambda, setInitialLambda] = useState<number>();
  const [finalLambda, setFinalLambda] = useState<number>();

  return (
    <main className="flex min-h-screen gap-2 flex-col items-center px-24 py-10 w-1/2 mx-auto">
      <input
        className="w-full mb-4 bg-indigo-900 rounded-full px-4 py-4 placeholder:text-white placeholder:text-center text-center placeholder:font-bold"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="w-full flex gap-2 justify-center">
        <input
          className="input-pretty"
          placeholder="λ Initial (Å)"
          type="number"
        />
        <input
          className="input-pretty"
          placeholder="λ Final (Å)"
          type="number"
        />
      </div>
    </main>
  );
}
