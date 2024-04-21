import React from "react";

type HeaderAttrs = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export default function Header(
  { children, className, style, ...props }: { children: React.ReactNode } & HeaderAttrs,
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
