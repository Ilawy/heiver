"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen p-3 grid grid-rows-2">
      <div className="flex flex-col justify-evenly items-center">
        <br /><br /><br />
        <div className="intro-icon">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <big className="font-extrabold text-3xl">
          <b>The new YOU platform</b>
        </big>
      </div>
      <div className="p-3 flex flex-col items-center justify-evenly">
        <p className="text-balance">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quod porro? Quo atque laudantium repellendus nulla quis porro saepe aspernatur consectetur nemo at similique impedit et inventore, totam eum consequatur?</p>
        <button className="w-full">
          Let{"'"}s get started
        </button>
      </div>
    </main>
  );
}
