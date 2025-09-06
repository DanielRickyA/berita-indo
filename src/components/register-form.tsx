import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function RegisterForm() {
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
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>
        <div className="grid gap-6">
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
          <div className="grid gap-3">
            <Label htmlFor="password">Role</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="animate-spin" />}
            Register
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 text-primary"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
