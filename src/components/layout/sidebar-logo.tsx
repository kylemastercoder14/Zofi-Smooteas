"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Think Safe</span>
            <span className="truncate text-xs">Dashboard Panel</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
