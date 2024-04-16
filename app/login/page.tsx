import Link from "next/link";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";
import { login } from "@/lib/actions";


// import type { DatabaseUser } from "@/lib/db";
// import type { ActionResult } from "@/lib/form";

export default async function Page() {
	return (
		<>
			<h1>Sign in</h1>
			<Form action={login}>
				<label htmlFor="username">Username</label>
				<input name="usernameOrEmail" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>
			</Form>
			<Link href="/signup">Create an account</Link>
		</>
	);
}

