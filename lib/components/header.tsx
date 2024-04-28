"use client"
import React, { Fragment } from "react";
import { Link } from "@/lib/hash";
import { useLocation } from "react-use";
import MotionDiv from "./mdiv";
import { useParams, usePathname } from "next/navigation";

type HeaderAttrs = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Header(
  { children, className, style, ...props }:
    & { children: React.ReactNode }
    & HeaderAttrs,
) {
  return (
    <header
      style={{
        viewTransitionName: "block-header",
        ...style,
      }}
      className={`bg-[var(--color-a)] p-4 rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </header>
  );
}

export function PP({ clickable = true }: { clickable?: boolean }) {
  const Wrapper = clickable ? Link : Fragment;
  const pathname = usePathname();
  const wrapperProps = Wrapper === Link ? { href: `/profile?from=${pathname}` } : {};

  
  return (
    //@ts-ignore
    <Wrapper {...wrapperProps}>
      <MotionDiv
        layoutId="block-pp"
        style={{
          viewTransitionName: "block-pp",
          width: 48,
          height: 48,
          borderRadius: 12e3,
          backgroundColor: "var(--color-b)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </MotionDiv>
    </Wrapper>
  );
}
