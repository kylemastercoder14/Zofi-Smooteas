"use client";

import * as React from "react";
import {
  Boxes,
  CalendarCheck,
  Clipboard,
  Clock,
  Logs,
  SquareTerminal,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { User } from "@prisma/client";
import { SidebarLogo } from "./sidebar-logo";

const data = {
  navMain: [
    {
      title: "Manage Staff",
      url: "/manage-staff",
      icon: Users,
    },
    {
      title: "Shift Management",
      url: "/shift-management",
      icon: Clock,
    },
    {
      title: "Attendance Report",
      url: "/attendance-report",
      icon: Clipboard,
    },
    {
      title: "Leave Application",
      url: "/leave-application",
      icon: CalendarCheck,
    },
    {
      title: "Inventory Management",
      url: "/inventory-management",
      icon: Boxes,
    },
    {
      title: "Logs",
      url: "/logs",
      icon: Logs,
    },
  ],
  navEmployee: [
    {
      title: "Dashboard",
      url: "/staff/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Leave Application",
      url: "/staff/leave-application",
      icon: CalendarCheck,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={user.role === "Admin" ? data.navMain : data.navEmployee}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
