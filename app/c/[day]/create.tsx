"use client";
import { motion } from "framer-motion";
import { parseDate } from "@/lib/types";
import Header, { PP } from "@/lib/components/header";
import Ranger from "@/lib/components/ranger";

export default function Create({ dayKey }: { dayKey: string }) {
  const day = parseDate(dayKey);

  return (
    <motion.main className="p-3">
     <Header className="flex items-center justify-between">
       Cooler day
       <PP />
     </Header>
     <h1>Create</h1>
     <section>
      <h2>Relegion</h2>
      <Ranger />
     </section>
     <section>
      <h2>Life</h2>
      <Ranger />
     </section>
     <section>
      <h2>Health</h2>
      <Ranger />
     </section>
    </motion.main>
  );
}
