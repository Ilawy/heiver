"use client";
import { AnimatePresence, motion } from "framer-motion";
import { parseDate } from "@/lib/types";
import Header, { PP } from "@/lib/components/header";
import Ranger from "@/lib/components/ranger";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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

function LevelToImage({ level }: { level: number }) {
  const props: React.ComponentProps<typeof motion.img> = {
    width: 48,
    height: 48,
    style: {
      display: "inline-block",
    },
    initial: {
      filter: "blur(6px)",
    },
    animate: {
      filter: "drop-shadow(0 0 12px #ffbb4d)",
    },
  };
  const wrapperProps = {
    style: {
      width: 48,
      height: 48,
    }
  }
  if (level === 1) {
    return (
      <motion.div {...wrapperProps}>
        <motion.img {...props} src={level_1_src.src} />
      </motion.div>
    );
  }
  if (level === 2) {
    return (
      <motion.div {...wrapperProps}>
        <motion.img {...props} src={level_2_src.src} />
      </motion.div>
    );
  }
  if (level === 3) {
    return (
      <motion.div {...wrapperProps}>
        <motion.img {...props} src={level_3_src.src} />
      </motion.div>
    );
  }
  if (level === 4) {
    return (
      <motion.div {...wrapperProps}>
        <motion.img {...props} src={level_4_src.src} />
      </motion.div>
    );
  }
  if (level === 5) {
    return (
      <motion.div {...wrapperProps}>
        <motion.img {...props} src={level_5_src.src} />
      </motion.div>
    );
  }
}
