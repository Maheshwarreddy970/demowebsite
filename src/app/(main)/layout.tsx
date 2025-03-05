"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/ui/cursour";
import { Bricolage_Grotesque } from "next/font/google";
import { FamilyButtonDemo } from "@/components/chatbot/newchatbot";
import { RecoilRoot } from "recoil";

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
    <main className={`${bricolageGrotesque.className}  font-bricolage bg-background text-foreground`} >

        <CursorFollower />
        <Navbar />
        <RecoilRoot>{children}</RecoilRoot>

        <Footer />
        <FamilyButtonDemo />
    </main>
  );
}