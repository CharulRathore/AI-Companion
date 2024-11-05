"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/mobile-sidebar1";

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
    </div>
  );
};
