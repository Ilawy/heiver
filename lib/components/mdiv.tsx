"use client"
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const MotionDiv = forwardRef<HTMLDivElement, React.ComponentProps<typeof motion.div>>(function MotionDiv(
  { ...props },
  ref
) {
  return <motion.div ref={ref} {...props} />;
})


export default MotionDiv