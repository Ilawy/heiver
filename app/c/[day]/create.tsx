"use client";
import { AnimatePresence, motion } from "framer-motion";
import { parseDate } from "@/lib/types";
import Header, { PP } from "@/lib/components/header";
import Ranger from "@/lib/components/ranger";
import { useForm } from "react-hook-form";
import { useEffect, useId } from "react";

import level_1_src from "@/public/level_1.png";
import level_2_src from "@/public/level_2.png";
import level_3_src from "@/public/level_3.png";
import level_4_src from "@/public/level_4.png";
import level_5_src from "@/public/level_5.png";

export default function Create({ dayKey }: { dayKey: string }) {
  const day = parseDate(dayKey);
  const { register, handleSubmit, setValue, watch } = useForm();
  const currentValues = watch();

  useEffect(() => {
    setValue("religion", 3);
    setValue("life", 3);
    setValue("health", 3);
  }, []);

  return (
    <motion.main className="p-3">
      <Header className="flex items-center justify-between">
        Cooler day
        <PP />
      </Header>
      <h1>Create</h1>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit((d) => {
          console.log(d);
        })}
      >
        <section>
          <h2>Relegion</h2>
          <div className="flex items-center gap-3">
            {/**@ts-ignore */}
            <Ranger
              {...register("religion")}
              onValueChange={(v) => setValue("religion", v[0])}
            />
            <AnimatePresence>
              <LevelToImage level={currentValues.religion} />
            </AnimatePresence>
          </div>
        </section>
        <section>
          <h2>Life</h2>
          <div className="flex items-center gap-3">
            {/**@ts-ignore */}
            <Ranger
              {...register("life")}
              onValueChange={(v) => setValue("life", v[0])}
            />
            <AnimatePresence>
              <LevelToImage level={currentValues.life} />
            </AnimatePresence>
          </div>
        </section>
        <section>
          <h2>Health</h2>
          <div className="flex items-center gap-3">
            {/**@ts-ignore */}
            <Ranger
              {...register("health")}
              onValueChange={(v) => setValue("health", v[0])}
            />
            <AnimatePresence>
              <LevelToImage level={currentValues.health} />
            </AnimatePresence>
          </div>
        </section>
        <button>save</button>
      </form>
    </motion.main>
  );
}

function LevelToImage({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const lts = (l: number) => Math.max(l * 6, 12);
  const id = "_"; //Math.random().toString(16).slice(3, 5);

  const levelToSouce = (l: 1 | 2 | 3 | 4 | 5) =>
    l === 1
      ? level_1_src
      : l === 2
      ? level_2_src
      : l === 3
      ? level_3_src
      : l === 4
      ? level_4_src
      : level_5_src;

  const props = (l: number): React.ComponentProps<typeof motion.img> =>({
    width: 48,
    height: 48,
    style: {
      display: "flex",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    },
    initial: {
      filter: "blur(6px) drop-shadow(0 0 6px #ffbb4d)",
    },
    animate: {
      // filter: `drop-shadow(0 0 ${lts(level)}px #ffbb4d)`,
      filter: "blur(0px) drop-shadow(0 0 6px #ffbb4d)",
      opacity: l === level ? 1 : 0,
    },
    exit: {
      filter: "blur(6px) drop-shadow(0 0 6px #ffbb4d)",
      position: "absolute",
    },
  });
  const wrapperProps: React.ComponentProps<typeof motion.div> = {
    style: {
      width: 48,
      height: 48,
      position: "relative",
    },
  };
  return (
    <motion.div {...wrapperProps}>
      <AnimatePresence>
        {[1, 2, 3, 4, 5].map((l) => (
          <motion.img
            key={`${id}${l}`}
            {...props(l)}
            src={levelToSouce(level).src}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
