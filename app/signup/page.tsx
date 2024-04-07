import { db } from "@/lib/db";
import { Tusers } from "@/lib/db/schema";
import { LibsqlError } from "@libsql/client";
import { generateId, Scrypt } from "lucia";
import { useFormState } from "react-dom";
import { z } from "zod";
import { formData, text } from "zod-form-data";
import Client from "./client";
import { signup } from "@/lib/actions";

export default async function Page() {
  return (
    <main className="p-3">
      <h1>Create an account</h1>
      <Client signup={signup} />
    </main>
  );
}


