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
import { GalleryVerticalEnd, Newspaper, Plane, Tag } from "lucide-react";

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
  ],
};
function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className="bg-[#0a57ff]">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-primary">
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        {isLoading || !profile ? (
          <MiniSkeleton />
        ) : (
          <NavUser profile={profile} setProfile={setProfile} />
        )}
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
