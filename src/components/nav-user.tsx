"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { getProfil, ProfilResponse } from "@/lib/api/apiAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronsUpDown, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function NavUser() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profil, setProfil] = useState<ProfilResponse>({
    id: "",
    username: "",
    role: "User",
    createdAt: "",
    updatedAt: "",
  });
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  async function fetchProfil() {
    try {
      const data = await getProfil();
      setProfil(data);
    } catch (error) {
      console.error("Gagal mengambil profil:", error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfil();
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.push("/login");
      setProfil({
        id: "",
        username: "",
        role: "",
        createdAt: "",
        updatedAt: "",
      });
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <header
      className={`w-full top-0 left-0 z-50 transition-all duration-500 ${
        scrolled || pathname !== "/"
          ? "fixed bg-[#2563EC] text-white shadow-md"
          : "absolute bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <p className="font-bold text-3xl text-white">BeritaIndo</p>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium text-white">
          {profil.id == "" ? (
            <div className="hidden md:flex gap-2 items-center">
              <Link href="/register">
                <Button
                  variant={"ghost"}
                  className="transition bg-transparent hover:bg-[#3b82f6]/60 hover:text-white"
                >
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button className="transition bg-white hover:bg-white/90 text-black border">
                  Login
                </Button>
              </Link>{" "}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="default"
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hidden md:flex bg-white hover:bg-white py-6"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-black ">
                      {profil?.username}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {profil?.role}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-4 size-4 text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full md:hidden"
              >
                <Menu className="text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                {profil.id === "" ? (
                  <div className="flex flex-col gap-2 w-full mt-8">
                    <Link href="/register" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setOpen(false)}
                      >
                        Register
                      </Button>
                    </Link>
                    <Link href="/login" className="w-full">
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          alt={profil.username}
                        />
                        <AvatarFallback className="rounded-lg">
                          {profil.username?.[0] ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {profil.username}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {profil.role}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
