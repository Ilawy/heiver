"use client";

import { motion } from "framer-motion";
import { User } from "lucia";
import { useState } from "react";
import { useForm } from "react-hook-form";
import diff from "microdiff";
import _ from "lodash";
import {type updateUser as _updateUser} from "@/lib/actions"

interface Props {
  user: User;
  updateUser: typeof _updateUser
}

export default function ProfileSection(props: Props) {
  const [loading, setLoading] = useState(false);
  const { formState: { dirtyFields }, register, watch, handleSubmit } = useForm();
  const w = watch();
  const original = _.pick(props.user, "name");
  const changes = diff(original, w).filter((c) => c.type === "CHANGE").map(
    (c) => c.path
  );
  const changedOnly = _.pick(w, ...changes);


  const submit = async (data: any)=>{
    setLoading(true)
    const result = await props.updateUser(changedOnly)
    if(!result.ok)alert(result.error)
    setLoading(false)
  }

  return (
    <motion.form
      layout
      className="shadow-lg border p-3 rounded-2xl flex flex-col gap-3 bg-gray-50"
      onSubmit={handleSubmit(submit)}
    >
      <h1 className="flex items-center gap-3">
        <b>Profile</b>
        {loading && <i className="gg-spinner"></i>}
      </h1>
      <label>
        <h2>Name</h2>
        <input
          type="text"
          placeholder="John Doe"
          defaultValue={props.user.name || undefined}
          {...register("name")}
        />
      </label>
      <button disabled={changes.length === 0} className="transition-colors button bg-blue-600 text-white">Save</button>
    </motion.form>
  );
}
