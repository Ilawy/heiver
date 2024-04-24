"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, useEffect, useId, useRef, useState } from "react";

const getAbsValue = (number: number) => Math.ceil(number / 20);

import level_1_src from "@/public/level_1.png";
import level_2_src from "@/public/level_2.png";
import level_3_src from "@/public/level_3.png";
import level_4_src from "@/public/level_4.png";
import level_5_src from "@/public/level_5.png";
import * as Slider from "@radix-ui/react-slider";
import { computePosition, flip, offset, shift } from "@floating-ui/dom";

const levelToSrc = {
  1: level_1_src,
  2: level_2_src,
  3: level_3_src,
  4: level_4_src,
  5: level_5_src,
};

const Ranger = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Slider.Root>
>(function Ranger(
  {onValueChange, ...props}: React.ComponentProps<typeof Slider.Root>,
  ref
) {
  const range = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const [currentValue, setCurrentValue] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [tipXY, setTipXY] = useState({ x: 0, y: 0 });
  const [dragTrigger, setDragTrigger] = useState(false);
  useEffect(() => {
    computePosition(range.current!, tip.current!, {
      middleware: [
        flip(),
        shift({
          padding: 5,
        }),
        offset(24),
      ],
      placement: "top",
    }).then((pos) => {
      setTipXY({
        x: pos.x,
        y: pos.y,
      });
    });
  }, [isDragging, dragTrigger]);

  const imgProps = {
    initial: {
      filter: "blur(6px)",
      opacity: 0,
    },
    animate: {
      filter: "blur(0)",
      opacity: 1,
    },
    exit: {
      filter: "blur(6px)",
      opacity: 0,
    },
    transition: {},
  };

  return (
    <>
      {/* <br /><br /><br /><br /><br /><br /> */}
      <AnimatePresence>
        <motion.span
          className="ranger-tip"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: isDragging ? 1 : 0,
            scale: isDragging ? 1 : 0,
          }}
          transition={{
            damping: 10,
            type: "spring",
          }}
          style={{
            top: tipXY.y + "px",
            left: tipXY.x + "px",
          }}
          ref={tip}
        >
          <motion.span className="content">
            <AnimatePresence>
              {Object.keys(levelToSrc).map((level: string, index) => (
                Number(level) === currentValue && (
                  <AnimatePresence key={index}>
                    {/*eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      key={index}
                      src={levelToSrc[
                        level as unknown as keyof typeof levelToSrc
                      ].src}
                      width={48}
                      height={48}
                      alt="level"
                      {...imgProps}
                    />
                  </AnimatePresence>
                )
              ))}
            </AnimatePresence>
          </motion.span>
        </motion.span>
      </AnimatePresence>
      <Slider.Root
        className="ranger relative flex items-center select-none touch-none w-[200px] h-5 bg-green-100"
        defaultValue={[50]}
        max={100}
        min={0}
        step={1}
        
        onValueChange={async (ranges) => {
          const value = ranges[0];
          const absValue = Math.max(getAbsValue(value), 1);
          setCurrentValue(absValue);
          setDragTrigger(!dragTrigger);
          onValueChange?.([absValue])
        }}
        {...props}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <Slider.Track className="track bg-blackA7 relative grow rounded-full h-[3px] bg-yellow-200">
          <Slider.Range className="absolute  rounded-full h-full bg-purple-200" />
        </Slider.Track>
        <Slider.Thumb
          ref={range}
          className="thumb"
          aria-label="Volume"
        />
      </Slider.Root>
    </>
  );
});

export default Ranger