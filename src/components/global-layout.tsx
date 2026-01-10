import Link from "next/link";
import React from "react";
import style from "./global-layout.module.css";
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.container}>
      <div>
        <header className={style.header}>
          <Link href="/"> Book store📕📘</Link>
        </header>
        <main className={style.main}> {children}</main>
        <footer className={style.footer}> made by @Jaeho </footer>
      </div>
    </div>
  );
}
