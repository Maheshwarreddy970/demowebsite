'use client';

import { useState } from "react";
import { SidebarAdmin } from "@/components/admin/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Replace with actual authentication logic
    if (email === "admin@example.com" && password === "password123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="text-xl font-semibold">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleLogin} className="px-4 py-2 text-white bg-blue-500 rounded">
          Login
        </button>
      </div>
    );
  }

  return (
    <main>
      <SidebarAdmin>{children}</SidebarAdmin>
    </main>
  );
}
