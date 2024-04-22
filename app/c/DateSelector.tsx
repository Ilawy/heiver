"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrevious, useRendersCount } from "react-use";

export default function DateSelector(
  { date, setDate, setSelecting }: {
    date: [number, number];
    setDate: (d: [number, number]) => void;
    setSelecting: (b: boolean) => void;
  },
) {
    const [newM, setNewM] = useState(date[0]);
    const [newY, setNewY] = useState(date[1]);
    console.log(newM, newY);
    

  return (
    <>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(16px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(16px)" }}
        className="date-picker-backdrop"
        onClick={() => setSelecting(false)}
      >
      </motion.div>
      <motion.div
        layoutId="date-selector"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="date-picker-dialog flex flex-col gap-1"
      >
        <h1>Pick a date</h1>
        <button onClick={()=>{
            const today = new Date();
            setDate([today.getMonth() + 1, today.getFullYear()]);
            setSelecting(false);
        }} className="bg-[var(--color-a)] text-[var(--text-color)] rounded-2xl p-3">Jump to today</button>
        <div className="flex flex-col gap-3">
          <label>
            Month
            <Stepper min={1} max={12} value={newM} setValue={setNewM} />
          </label>
          <label>
            Year
            <Stepper min={1900} max={2100} value={newY} setValue={setNewY} />
          </label>
        </div>
        <button onClick={() => {
          setDate([newM, newY]);
          setSelecting(false);
        }}>Done</button>
      </motion.div>
    </>
  );
}

export function DateDisplay(
  { date: [month, year], setSelecting }: {
    date: [number, number];
    setSelecting: (b: boolean) => void;
  },
) {
  return (
    <motion.button
      layoutId="date-selector"
      onClick={() => setSelecting(true)}
      className="bg-[var(--color-c)] text-[var(--text-color)] rounded-2xl p-3 flex items-center justify-center text-xl font-bold gap-3 sticky top-3 z-50"
    >
      <h3>{month}</h3>
      {"/"}
      <h3>{year}</h3>
    </motion.button>
  );
}

function Stepper({value, setValue, min = 0, max = Infinity, step = 1}: {value: number, setValue: (v: number) => void, min?: number, max?: number, step?: number}) {
  const oldValue = usePrevious(value);
  const oldRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  let prevAnimations: Animation[] = [];
  const r = useRendersCount()
  console.log(value, r);
  

  function changeValue(v: number) {
    if (v < min) v = min;
    if (v > max) v = max;
    setValue(v);
  }

  useEffect(() => {
    prevAnimations.forEach((a) => a.cancel());
    prevAnimations = [];
  }, [value, oldValue]);

  useEffect(() => {
    const direction = value - oldValue!;
    const a = oldRef.current?.animate([{
      opacity: 1,
      translate: "0 0",
    }, {
      opacity: 0,
      translate: direction > 0 ? "100% 0" : "-100% 0",
    }], {
      fill: "forwards",
      duration: 325,
    });

    prevAnimations.push(a!);
  }, [oldValue]);

  useEffect(() => {
    const direction = value - oldValue!;
    const a = newRef.current?.animate([{
      opacity: 0,
      translate: direction > 0 ? "-100% 0" : "100% 0",
    }, {
      opacity: 1,
      translate: direction > 0 ? "0 0" : "0 0",
    }], {
      fill: "forwards",
      duration: 325,
    });

    prevAnimations.push(a!);
  }, [value]);

  return (
    <div className="flex items-center gap-3 max-w-56">
      <button className="bg-white px-3" onClick={() => changeValue(value - step)}>
        -
      </button>
      <div className="relative overflow-hidden flex-1 h-[3ch]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          id="old"
          ref={oldRef}
        >
          {oldValue}
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          id="new"
          ref={newRef}
        >
          {value}
        </div>
      </div>
      <button className="bg-white px-3" onClick={() => changeValue(value + step)}>
        +
      </button>
    </div>
  );
}
