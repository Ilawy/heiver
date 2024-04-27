"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Key, User } from "react-feather";
import { startViewTransition } from "@/lib/utils";
import { useAsyncFn, useLocalStorage } from "react-use";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import { type login as _login } from "@/lib/actions";
import FormWaiter from "@/lib/components/formwaiter";
import { z } from "zod";
import { LoginActionPayload } from "@/lib/types";

interface Props {
  login: typeof _login;
}

interface LoginProps {
  login: typeof _login;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export default function Client(props: Props) {
  const [tab, setTab] = useState<"login" | "signup">(
    // "auth_tab",
    "login",
  );
  const [loading, setLoading] = useState(false);
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            style={{
              backdropFilter: "blur(4px)",
            }}
            className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-40"
          >
            <motion.div
              layoutId="button-loading"
              style={{
                translate: "-50% -50%",
              }}
              className="absolute z-50 left-1/2 top-1/2 p-3 rounded-2xl bg-[var(--color-a)] w-full max-w-xs h-32 flex items-center justify-center flex-col gap-3"
            >
              <h1>Loading</h1>
              <span className="gg-spinner"></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="tabs">
        <motion.button
          onClick={() => startViewTransition(() => setTab("login"))}
        >
          Login
          {tab === "login" && (
            <motion.div layoutId="indecator" className="indecator"></motion.div>
          )}
        </motion.button>
        <motion.button
          onClick={() => startViewTransition(() => setTab("signup"))}
        >
          Signup

          {tab === "signup" && (
            <motion.div layoutId="indecator" className="indecator"></motion.div>
          )}
        </motion.button>
      </div>

      {tab === "login"
        ? (
          <Login
            loading={loading}
            setLoading={setLoading}
            login={props.login}
          />
        )
        : <Signup setLoading={setLoading} />}
    </>
  );
}

function Login(props: LoginProps) {
  // const [{ loading, error, value }, loginAction] = useAsyncFn(props.login)
  const { register, handleSubmit, formState: { errors } } = useForm<
    z.infer<typeof LoginActionPayload>
  >();
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <motion.h1 layoutId="title">Login</motion.h1>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit((data, event) => {
            try {
              props.setLoading(true);
              props.login(data).then((e) => {
                if (e) {
                  if (!e.ok) alert(e.error);
                }
              });
            } finally {
              props.setLoading(false);
              // setLoading(false);
            }
          })}
        >
          <div className="rounded-xl border p-3 flex flex-col gap-1">
            <label className="flex gap-3 items-center p-1">
              <div className="bg-[#ACFADF] w-12 h-12 aspect-square flex items-center justify-center rounded-full">
                <User />
              </div>
              <input
                {...register("usernameOrEmail", {
                  required: true,
                  min: 3,
                })}
                className="native px-2 py-2 flex-1"
                placeholder="Username"
                type="text"
              />
            </label>
            {!!errors.usernameOrEmail &&
              errors.usernameOrEmail.type === "required" &&
              ("Username is required")}
            <hr />
            <label className="flex gap-3 items-center p-1">
              <div className="bg-[#ACFADF] w-12 h-12 aspect-square flex items-center justify-center rounded-full">
                <Key />
              </div>
              <input
                className="native px-2 py-2 flex-1"
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: true,
                  min: 8,
                })}
              />
            </label>
            {!!errors.password && errors.password.type === "required" &&
              ("Password is required")}
          </div>
          <div className="flex items-center justify-between gap-3">
            {!props.loading && (
              <motion.button
                layoutId="button-loading"
                className="button flex-1"
              >
                Login
              </motion.button>
            )}
          </div>
        </form>
        <button className="my-3 underline">Recover your account</button>
      </div>

      <div className="">
        {/* TODO: SOCIAL LOGIN */}
      </div>
    </div>
  );
}
function Signup({ setLoading }: { setLoading: (loading: boolean) => void }) {
  return (
    <div>
      <br />
      <br />
      <br />
      <motion.h1 layoutId="title">Sorry</motion.h1>
      <p className="text-balance">
        Hiever is now in closed beta. You can gain access by sending message
        {" "}
        <a
          className="underline text-blue-600"
          href="https://hey.new/4ov"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{" "}
        to try it.
      </p>
    </div>
  );
}
