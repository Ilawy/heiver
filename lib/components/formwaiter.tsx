"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function FormWaiter({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>> | ((l: boolean)=>void);
}) {
  const { action, data, pending } = useFormStatus();
  useEffect(() => {
    setLoading(pending);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);
  return null;
}
