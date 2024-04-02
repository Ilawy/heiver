"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function UI({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </motion.main>
  );
}
