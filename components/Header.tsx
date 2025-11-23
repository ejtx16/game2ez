"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isProfileEnabled = process.env.NEXT_PUBLIC_ENABLE_PROFILE_PAGE === "true";

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
            <svg
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_0.6s_ease-in-out_infinite] transition-opacity"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Favorites
          </Link>
          <Link
            href="/mybag"
            className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors group py-4 border-b-2 border-transparent hover:border-orange-500"
          >
            <svg
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_0.6s_ease-in-out_infinite] transition-opacity"
              fill="currentColor"
              // stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            My Bag
          </Link>
          <Link
            href="/teams"
            className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors group py-4 border-b-2 border-transparent hover:border-orange-500"
          >
            <svg
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_0.6s_ease-in-out_infinite] transition-opacity"
              fill="currentColor"
              // stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Teams
          </Link>
          {isProfileEnabled && (
            <Link
              href="/profile"
              className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors group py-4 border-b-2 border-transparent hover:border-orange-500"
            >
              <svg
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_0.6s_ease-in-out_infinite] transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2.5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10m0-20c-2.5 3-4 6.5-4 10s1.5 7 4 10M2 12h20"
                />
              </svg>
              Profile
            </Link>
          )}
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
              theme === "dark" ? (
                <Sun className="w-5 h-5 text-orange-500" />
              ) : (
                <Moon className="w-5 h-5 text-zinc-300" />
              )
            ) : (
              <Sun className="w-5 h-5 text-orange-500" />
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
                <SheetDescription className="text-zinc-400">Navigate to different pages and change theme settings</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/favorites"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Favorites
                </Link>
                <Link
                  href="/mybag"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  My Bag
                </Link>
                <Link
                  href="/teams"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Teams
                </Link>
                {isProfileEnabled && (
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2.5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10m0-20c-2.5 3-4 6.5-4 10s1.5 7 4 10M2 12h20"
                      />
                    </svg>
                    Profile
                  </Link>
                )}
                <div className="border-t border-zinc-800 pt-4 mt-4">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center justify-between w-full text-sm font-medium text-zinc-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-zinc-800"
                  >
                    <span>Theme</span>
                    {mounted ? (
                      theme === "dark" ? (
                        <Sun className="w-5 h-5 text-orange-500" />
                      ) : (
                        <Moon className="w-5 h-5 text-zinc-300" />
                      )
                    ) : (
                      <Sun className="w-5 h-5 text-orange-500" />
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
