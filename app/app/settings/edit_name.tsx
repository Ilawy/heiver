"use client";

import { type updateName as _updateName } from "@/lib/actions";
import { type IUsers } from "@/lib/db/schema";
import { useState } from "react";
import { useSetState } from "react-use";
import { z } from "zod";

export default function EditName({ currentName, updateName }: {
  currentName: z.infer<typeof IUsers.select>["name"];
  updateName: typeof _updateName
}) {
    const [editing, setEditing] = useState(false);
    const [uiState, setUiState] = useSetState({
        name: currentName || null,
    })    
    

  if(!editing)return (
    <>
      <h1>
        Hey, {uiState.name || "Friend"}{" "}
        <button onClick={() => setEditing(true)} className="native text-sm underline text-blue-600">Edit</button>
      </h1>
    </>
  );
  else return <div>
    <form className="flex gap-3" action={updateName}>
        <input type="text" name="name" defaultValue={uiState.name || ""} />
        <button type="submit" onClick={(e) => {
            e.currentTarget.form?.addEventListener("loadeddata", (e) => {
                setEditing(false)
            })
        }}>Save</button>
    </form>
  </div>
}
