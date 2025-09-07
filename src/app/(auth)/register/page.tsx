"use client";

import RegisterForm from "@/components/register-form";
import { register } from "@/lib/api/apiAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async ({
    username,
    password,
    role,
  }: {
    username: string;
    password: string;
    role: string;
  }) => {
    setIsLoading(true);

    try {
      const data = await register({ username, password, role });
      console.log("Registration successful:", data);
      toast.success("Registration successful!");

      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover z-10"
        />
        <div className="absolute inset-0 bg-[#2563EC] opacity-85 z-20"></div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"></div>
            BeritaIndo
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default Page;
