'use client';

import { useState } from "react";
import { SidebarAdmin } from "@/components/admin/sidebar";
import { SignupFormDemo } from "@/components/Signup";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
 
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
      <SignupFormDemo setIsAuthenticated={setIsAuthenticated}></SignupFormDemo>
      </div>
    );
  }

  return (
    <main>
      <SidebarAdmin>{children}</SidebarAdmin>
    </main>
  );
}
