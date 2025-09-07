"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryModelResponse } from "@/lib/api/apiCategory";

interface SearchAndFilterProps {
  categories: CategoryModelResponse[];
}

export default function SearchAndFilter({ categories }: SearchAndFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || undefined;
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setSelectedCategory(undefined);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("category");
      router.push("/?" + params.toString());
      return;
    }

    setSelectedCategory(value || undefined);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push("/?" + params.toString());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push("/?" + params.toString());
  };

  return (
    <div className="bg-[#3b82f6] flex gap-4 items-center max-w-xl w-full mx-auto rounded-lg mt-4 px-4 py-2">
      <div className="w-[50%]">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full bg-white !text-black/80">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories
              .filter((category) => category.id)
              .map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search article name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full bg-white !text-black/80"
        />
      </div>
    </div>
  );
}
