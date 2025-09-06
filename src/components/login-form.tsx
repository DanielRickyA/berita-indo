"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("tes");
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-full max-w-xs">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="animate-spin" />}
            Login
          </Button>
        </div>

        <div className="text-center text-sm">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 text-primary"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
