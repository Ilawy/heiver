"use client";

import { useHashKey } from "@/lib/hash";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Client({ dayKey }: { dayKey: string }) {

  return (
    <>
      <AnimatePresence>
        <motion.span layoutId={`day-${dayKey}`}>
          Cool thing
        </motion.span>
      </AnimatePresence>
    </>
  );
}
