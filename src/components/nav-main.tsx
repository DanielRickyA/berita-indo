"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

function NavMain({
  items,
  onLogout,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isLogout?: boolean;
    items?: { title: string; url: string }[];
  }[];
  onLogout: () => void;
}) {
  return (
    <SidebarGroup className="mt-4">
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              onClick={item.isLogout ? onLogout : undefined} // jika logout, jalankan onLogout
            >
              {item.isLogout ? (
                <span className="flex items-center gap-4 w-full cursor-pointer  font-semibold">
                  {item.icon && <item.icon />}
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="flex items-center gap-4 w-full"
                >
                  {item.icon && <item.icon />}
                  <span className="text-lg">{item.title}</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default NavMain;
