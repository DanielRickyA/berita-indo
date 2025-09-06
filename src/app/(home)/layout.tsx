"use client";

import NavUser from "@/components/nav-user";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("✅ HomeLayout loaded");
  return (
    <>
      <NavUser />
      {children}
    </>
  );
}
