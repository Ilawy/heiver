"use client";

import { useHashKey } from "@/lib/hash";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Client({ dayKey }: { dayKey: string }) {
    const hashes = useHashKey("name")
    useEffect(()=>{
        localStorage.setItem("lastVisitedDay", dayKey)
    }, [])

  return (
    <>
      <AnimatePresence>
        <motion.span layoutId={`day-${dayKey}`}>
          Cool
        </motion.span>
      </AnimatePresence>
    </>
  );
}
