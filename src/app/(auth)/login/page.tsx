"use client";

import LoginForm from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/lib/api/apiAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);

    try {
      const data = await login({ username, password });
      localStorage.setItem("token", data.token ?? "");
      localStorage.setItem("role", data.role ?? "");
      toast.success("Login successful!");
      if (data.role == "Admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"></div>
            BeritaIndo
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
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
    </div>
  );
}

export default Page;
