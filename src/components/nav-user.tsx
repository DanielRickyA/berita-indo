"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function NavUser() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // kalau scroll lebih dari 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`w-full top-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "fixed bg-[#2563EC] text-white shadow-md"
          : "absolute bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <p className="font-bold text-3xl text-white">BeritaIndo</p>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium text-white">
          <Link href="/register">
            <Button
              variant={"ghost"}
              className="transition bg-transparent hover:bg-transparent/50"
            >
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button className="transition bg-white/80 hover:bg-white/60 text-black border">
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
