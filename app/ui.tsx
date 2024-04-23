"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from 'sonner'
export default function UI({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <Toaster position="top-center" richColors />
    {children}
  </>
}
