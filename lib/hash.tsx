"use client";
import { Link as NVTLink } from "next-view-transitions";
import { useMemo } from "react";

export const useHashKey = function <T = unknown>(key: string) {
  // const [hash, setHash] = useHash();
  // const readyHash: Record<string, string> = useMemo(() => {
  //   const h = hash.split("#").map((part) => decodeURIComponent(part));
  //   if (h.length === 1) return {};
  //   return parseKeyValuePairs(h[1]);
  // }, [hash]);
  

  // return [readyHash[key], (value: T) => {
  //   console.time("setHash");
  //   const clone = structuredClone(readyHash);
  //   //@ts-ignore
  //   clone[key] = value;
  //   setHash(`#${stringifyKeyValuePairs(clone)}`);
  //   console.timeEnd("setHash");
  // }] as const;
  return [null, ()=>{}]as const
};

function parseKeyValuePairs(input: string) {
  let obj: Record<string, string> = {};
  let parts = input.split(";");
  let currentKey = "";
  let currentValue = "";
  let inQuotes = false;

  for (let part of parts) {
    for (let char of part) {
      if (char === ":" && !inQuotes) {
        currentKey = currentValue.trim();
        currentValue = "";
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else {
        currentValue += char;
      }
    }

    if (currentKey && !inQuotes) {
      obj[currentKey] = currentValue.trim();
      currentKey = "";
      currentValue = "";
    } else {
      currentValue += ";";
    }
  }

  return obj;
}

function stringifyKeyValuePairs(obj: Record<string, string>) {
  return Object.entries(obj).map(([key, value]) =>
    `${key}:${JSON.stringify(value)}`
  ).join(";");
}

export function Link(
  { href, ...props }: React.ComponentProps<typeof NVTLink>
) {
  

  return <NVTLink href={href} {...props} />;
}
