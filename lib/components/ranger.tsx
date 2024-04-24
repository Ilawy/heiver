"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import level_1_src from "@/public/level_1.png";
import level_2_src from "@/public/level_2.png";
import level_3_src from "@/public/level_3.png";
import level_4_src from "@/public/level_4.png";
import level_5_src from "@/public/level_5.png";
import * as Slider from "@radix-ui/react-slider";
import { computePosition, flip, offset, shift } from "@floating-ui/dom";



export default function Ranger() {
    const range = useRef<HTMLSpanElement>(null);
    const tip = useRef<HTMLSpanElement>(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [tipXY, setTipXY] = useState({ x: 0, y: 0 });
  
  
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
    };
  
    return (
      <>
        {/* <br /><br /><br /><br /><br /><br /> */}
        <AnimatePresence>
          {isDragging && (
            <motion.span
              className="fixed p-3 bg-gray-50 rounded-2xl"
              initial={{
                opacity: 0,
                scale: 0,
              }}
  
              animate={{
                opacity: 1,
                scale: 1,
                top: tipXY.y + "px",
                left: tipXY.x + "px",
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                damping: 10,
                type: "spring",
              }}
              ref={tip}
            >
              <AnimatePresence>
                {currentValue === 1 && (
                  <motion.img
                    {...imgProps}
                    src={level_1_src.src}
                    width={48}
                    alt="level 1"
                  />
                )}
                {currentValue === 2 && (
                  <motion.img
                    {...imgProps}
                    src={level_2_src.src}
                    width={48}
                    alt="level 1"
                  />
                )}
                {currentValue === 3 && (
                  <motion.img
                    {...imgProps}
                    src={level_3_src.src}
                    width={48}
                    alt="level 1"
                  />
                )}
                {currentValue === 4 && (
                  <motion.img
                    {...imgProps}
                    src={level_4_src.src}
                    width={48}
                    alt="level 1"
                  />
                )}
                {currentValue === 5 && (
                  <motion.img
                    {...imgProps}
                    src={level_5_src.src}
                    width={48}
                    alt="level 1"
                  />
                )}
              </AnimatePresence>
            </motion.span>
          )}
        </AnimatePresence>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-[200px] h-5"
          defaultValue={[1]}
          max={5}
          min={1}
          step={1}
          name="xx"
          onValueChange={async (ranges) => {
            const value = ranges[0];
            setCurrentValue(value);
            const pos = await computePosition(range.current!, tip.current!, {
              middleware: [
                flip(),
                shift({
                  padding: 5,
                }),
                offset(24),
              ],
              placement: "top",
            });
  
            setTipXY({
              x: pos.x,
              y: pos.y,
            });
          }}
        >
          <Slider.Track className="bg-blackA7 relative grow rounded-full h-[3px] bg-yellow-200">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            ref={range}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
            aria-label="Volume"
          />
        </Slider.Root>
      </>
    );
  }
  