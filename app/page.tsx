"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen p-3 grid grid-rows-2">
      <div className="flex flex-col justify-evenly items-center pt-24">
        <div className="intro-icon">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <big className="font-extrabold text-3xl">
          <b>The new YOU platform</b>
        </big>
      </div>
      <div className="p-3 flex flex-col items-center justify-evenly">
        <p className="text-balance">
          Heiver is a set of mental health tools designed to help you stay
          focuesd and shorten the amount of distractions.
        </p>
        <Link href={"/auth"} role="button" className="w-full">
          Let{"'"}s get started
        </Link>
      </div>
    </main>
  );
}
