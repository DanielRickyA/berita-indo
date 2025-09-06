import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React from "react";

function Home() {
  return (
    <div className="relative">
      <div className="relative w-full h-[50dvh]">
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover z-10"
        />
        <div className="absolute inset-0 bg-[#2563EC] opacity-85 z-20"></div>
        {/* Konten di tengah */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <p className="font-semibold text-white text-4xl text-center">
              BeritaIndo: Headlines, Articles, Insights, and Stories Worldwide
            </p>
            <p className="mt-4 text-center text-white/90 font-light">
              Your trusted source for news and fresh perspectives
            </p>
            <div className="bg-[#3b82f6] flex gap-4 items-center max-w-xl w-full mx-auto rounded-lg mt-4 px-4 py-2 ">
              <div className="w-[50%]">
                <Select>
                  <SelectTrigger className="w-full bg-white !text-black/80">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Alam</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Input
                  type="email"
                  placeholder="Search article name"
                  className="w-full bg-white !text-black/80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
