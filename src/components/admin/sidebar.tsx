"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Upload } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode
}

export function SidebarAdmin({ children }: AppLayoutProps) {
  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Upload",
      href: "/admin/upload",
      icon: (
        <Upload className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
        
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <div className=' flex items-center gap-2 '>
      <img width={50} height={50} src='/aa8c7f48-de04-4d37-98aa-da071b0809be.svg' className=' size-7' alt='svg icon '></img>
      <div className='text-[0.8rem] leading-4 tracking-[-1.9px] text-left text-[rgb(170,136,103)]'>
        <span className=' font-semibold'>OAKWOOD</span>
        <br></br>
        <span className='font-thin'>
          ARCHITECTS
        </span>
      </div>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <div className=' flex items-center gap-2 '>
    <img width={50} height={50} src='/aa8c7f48-de04-4d37-98aa-da071b0809be.svg' className=' size-7' alt='svg icon '></img>
  </div>
  );
};

