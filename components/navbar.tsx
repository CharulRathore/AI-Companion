"use client";

import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"]
});

export const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-6 shadow-lg border-b border-primary/10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-extrabold tracking-tight text-white",
              font.className
            )}
          >
            BrightMind.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <Button variant="premium" size="default" className="bg-black text-white border-0 hover:bg-gradient-to-r hover:from-sky-500 hover:via-blue-500 hover:to-cyan-500 duration-200  transition-all ease-in-out">   
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white ml-1" />
        </Button>
        <ModeToggle />
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
};
