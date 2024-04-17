import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./libmodern.scss";
import Script from "next/script";
import UI from "./ui";
import Link from "next/link";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'max-w-xl mx-auto'}>
        <header>
          <Link href={"/app"}>RLH</Link>
          <div>
              <Link href={"/app/settings"}>Settings</Link>
          </div>
        </header>
        <UI>
          {children}
        </UI>
        <Script src="/tz.js" defer strategy="beforeInteractive" />
      </body>
    </html>
  );
}
