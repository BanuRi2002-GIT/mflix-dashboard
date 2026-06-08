"use client";

import Link from "next/link";
import { Logo } from "./ui/logo";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">CineScope</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/movies" className="text-sm font-medium hover:text-primary transition-colors">
              Movies
            </Link>
            <Link href="/genres" className="text-sm font-medium hover:text-primary transition-colors">
              Genres
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
