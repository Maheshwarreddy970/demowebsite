'use client';

import { SidebarAdmin } from "@/components/admin/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {

  return (
    <main>
      <SidebarAdmin>{children}</SidebarAdmin>
    </main>
  );
}
