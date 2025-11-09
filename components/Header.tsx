"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-zinc-900 border-zinc-800 p-2 opacity-90 hover:opacity-100 transition-opacity">
      <div className="max-w-7xl mx-auto px-12 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-400 transition-colors">
            <span className="text-white font-bold text-sm">G2</span>
          </div>
          <span className="font-bold text-xl text-white">Game2EZ</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 overflow-visible">
          <Link
            href="/favorites"
            className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors group py-4 border-b-2 border-transparent hover:border-orange-500"
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_0.6s_ease-in-out_infinite] transition-opacity">
              🏀
            </span>
            Favorites
          </Link>
          <Link
            href="/teams"
            className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors group py-4 border-b-2 border-transparent hover:border-orange-500"
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_0.6s_ease-in-out_infinite] transition-opacity">
              🏀
            </span>
            Teams
          </Link>
          <Link
            href="/profile"
            className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors group py-4 border-b-2 border-transparent hover:border-orange-500"
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_0.6s_ease-in-out_infinite] transition-opacity">
              🏀
            </span>
            Profile
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle - Desktop */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? <Sun className="w-4 h-4 text-orange-500" /> : <Moon className="w-4 h-4 text-zinc-400" />
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label="Open menu"
              >
                <MoreVertical className="w-4 h-4 text-zinc-300" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-zinc-900 border-zinc-800">
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
                <SheetDescription className="text-zinc-400">
                  Navigate to different pages and change theme settings
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/favorites"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800"
                >
                  🏀 Favorites
                </Link>
                <Link
                  href="/teams"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800"
                >
                  🏀 Teams
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800"
                >
                  🏀 Profile
                </Link>
                <div className="border-t border-zinc-800 pt-4 mt-4">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center justify-between w-full text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800"
                  >
                    <span>Theme</span>
                    {mounted ? (
                      theme === "dark" ? <Sun className="w-4 h-4 text-orange-500" /> : <Moon className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <div className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
