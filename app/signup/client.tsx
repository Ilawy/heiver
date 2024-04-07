"use client";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { signup as _signup } from "@/lib/actions";
export default function Client({
  signup,
}: {
  signup: typeof _signup;
}) {
  const [formState, signupAction] = useFormState(signup, null);
  const dialogref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (formState && !formState.ok) {
      dialogref.current?.showModal();
    }
  }, [formState]);

  return (
    <>
      {formState && !formState.ok && (
        <dialog ref={dialogref}>
          <p>{formState.error}</p>
        </dialog>
      )}
      <form action={signupAction} className="max-w-sm flex flex-col gap-3">
        <label className="input">
          Email
          <input required type="email" name="email" />
        </label>

        <label className="input">
          Username
          <input required name="username" id="username" />
        </label>
        <label className="input">
          Password
          <input required type="password" name="password" id="password" />
        </label>
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}
