"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import NavMain from "./nav-main";
import TeamSwitcher from "./team-switcher";
import { GalleryVerticalEnd, LogOut, Newspaper, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfil, ProfilResponse } from "@/lib/api/apiAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const data = {
  teams: [
    {
      name: "BeritaIndo",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Article",
      url: "/admin",
      icon: Newspaper,
      isActive: true,
    },
    {
      title: "Category",
      url: "/admin/category",
      icon: Tag,
      isActive: true,
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
      isLogout: true,
    },
  ],
};
function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profil, setProfil] = useState<ProfilResponse>({
    id: "",
    username: "",
    role: "User",
    createdAt: "",
    updatedAt: "",
  });

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
    const role = localStorage.getItem("role");
    if (role != "Admin") {
      router.push("/login");
    }
    if (token) {
      fetchProfil();
    }
  }, [router]);

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
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className="bg-[#0a57ff]">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-primary">
        <NavMain items={data.navMain} onLogout={handleLogout} />
      </SidebarContent>
      <SidebarFooter className="bg-primary pb-4 ">
        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-2 ">
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
              <span className="truncate font-semibold">{profil.username}</span>
              <span className="truncate text-xs white/80">{profil.role}</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
