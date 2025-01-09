/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useUser } from "@/hooks/use-user";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await useUser();
  return (
    <SidebarProvider>
      {user && <AppSidebar user={user} />}
      <SidebarInset>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
