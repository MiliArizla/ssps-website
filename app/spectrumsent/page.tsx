"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sent() {
  const router = useRouter();
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <main className="items-center flex min-h-screen py-10 flex-col px-24  mx-auto gap-20">
      <span className="text-center text-5xl">
        The spectra are being calculated and will be sent to your email soon :D
      </span>
      <button
        className=" w-1/2 py-4 bg-indigo-900 text-center font-bold rounded-full"
        title="If you don't receive it in 30 min click here"
        onClick={() => router.push("/reportissue")}
      >
        If you do not receive it in 30 min click here
      </button>
    </main>
  );
}
