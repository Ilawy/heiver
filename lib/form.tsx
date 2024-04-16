"use client";

import { useFormState } from "react-dom";
import { Result } from "./actions";

export function Form({
	children,
	action
}: {
	children: React.ReactNode;
	action: (prevState: any, formData: FormData) => Promise<Result>;
}) {
	const [state, formAction] = useFormState(action, null);
	return (
		<form action={formAction}>
			{children}
			<p>{!!(state && !state.ok) && state.error}</p>
		</form>
	);
}

