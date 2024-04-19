"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Key, User } from "react-feather";
import { startViewTransition } from "@/lib/utils";
import { useLocalStorage } from "react-use";
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
}


export default function Client(props: Props) {
  const [tab, setTab] = useState<"login" | "signup">(
    // "auth_tab",
    "login",
  );
  return (
    <>
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

      {tab === "login" ? <Login login={props.login} /> : <Signup />}
    </>
  );
}

function Login(props: LoginProps) {
  const [state, loginAction] = useFormState(props.login, null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<
    z.infer<typeof LoginActionPayload>
  >();
  useEffect(() => {
    console.log(state, loading);
    
    
    return () => {};
  }, [state, loading]);
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <motion.h1 layoutId="title">Login</motion.h1>
        {loading && "..."}
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit((_, event) => {
            try{
                setLoading(true);
                const fd = new FormData(event!.target);
                loginAction(fd);
            }finally{
                setLoading(false);
            }
          })}
        >
          <FormWaiter setLoading={setLoading} />
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
            {!!errors.usernameOrEmail && errors.usernameOrEmail.type === "required" && ("Username is required")}
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
            {!!errors.password && errors.password.type === "required" && ("Password is required")}

          </div>
          <div className="flex items-center justify-between gap-3">
            <button className="button flex-1">Login</button>
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
function Signup() {
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
