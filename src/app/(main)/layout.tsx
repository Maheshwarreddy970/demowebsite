"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/ui/cursour";
import { Bricolage_Grotesque } from "next/font/google";
import Lenis from 'lenis'
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";


const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200"],
  variable: "--font-bricolage",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main
      className={`${bricolageGrotesque.className} font-bricolage bg-background text-foreground`}
    >
      <SmoothScrollProvider>
        <CursorFollower />
        <Navbar />
        {children}
        <Footer />
      </SmoothScrollProvider>
    </main>
  );
}
