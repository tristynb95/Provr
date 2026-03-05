"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, ClipboardCheck, Sparkles, User, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Surveys", href: "/surveys", icon: ClipboardCheck },
  { label: "Dashboard", href: "/dashboard", icon: Sparkles },
  { label: "Shower Thoughts", href: "/shower-thoughts", icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
                <MessageSquareText className="h-5 w-5 fill-current" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight hidden sm:block">Provr.</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium hidden sm:inline">Alex Baker</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="lg:hidden flex items-center justify-around py-2 border-t overflow-x-auto whitespace-nowrap bg-background">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-1 text-[10px] font-medium transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
