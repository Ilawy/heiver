"use client";
import { motion } from "framer-motion";
import { parseDate } from "@/lib/types";
import Header, { PP } from "@/lib/components/header";
import Ranger from "@/lib/components/ranger";
import { useForm } from "react-hook-form";

export default function Create({ dayKey }: { dayKey: string }) {
  const day = parseDate(dayKey);
  const { register, handleSubmit } = useForm();

  return (
    <motion.main className="p-3">
      <Header className="flex items-center justify-between">
        Cooler day
        <PP />
      </Header>
      <h1>Create</h1>
      <form className="flex flex-col gap-3" onSubmit={e=>{
        e.preventDefault()
        console.log(Object.fromEntries(new FormData(e.currentTarget)));
        
      }}>
        <section>
          <h2>Relegion</h2>
          {/**@ts-ignore */}
          <Ranger {...register("religion")} />
        </section>
        <section>
          <h2>Life</h2>
          {/**@ts-ignore */}
          <Ranger {...register("life")} />
        </section>
        <section>
          <h2>Health</h2>
          {/**@ts-ignore */}
          <Ranger {...register("health")} />
        </section>
        <button>save</button>
      </form>
    </motion.main>
  );
}
