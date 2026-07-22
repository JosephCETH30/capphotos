"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { User } from "@supabase/supabase-js";
import { Menu, Moon, Sun, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton, useLogout } from "@/components/auth/LogoutButton";
import { ThemeToggle, useThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  initialUser: User | null;
}

export function Navbar({ initialUser }: NavbarProps) {
  const [user, setUser] = useState(initialUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useLogout();
  const { isDark, toggle: toggleTheme } = useThemeToggle();

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const initials = getInitials(user);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          Caphoto
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            {user ? (
              <>
                <Button variant="ghost" nativeButton={false} render={<Link href="/dashboard" />}>
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        aria-label="Account menu"
                      />
                    }
                  >
                    <Avatar size="sm">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="truncate font-normal text-foreground">
                        {user.email}
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem render={<Link href="/dashboard" />}>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem render={<Link href="/dashboard/account" />}>
                      Account settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={logout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
                  Log in
                </Button>
                <Button nativeButton={false} render={<Link href="/signup" />}>
                  Sign up
                </Button>
              </>
            )}
          </nav>

          <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogPrimitive.Trigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Backdrop className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
              <DialogPrimitive.Popup className="fixed inset-x-0 top-0 z-40 outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
                <div className="relative bg-popover text-popover-foreground shadow-lg">
                  <div className="flex items-center justify-between border-b px-4 py-3.5">
                    <DialogPrimitive.Title className="text-base font-medium">Menu</DialogPrimitive.Title>
                    <DialogPrimitive.Close render={<Button variant="ghost" size="icon-sm" />}>
                      <X className="size-4" />
                      <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                  </div>

                  <div className="flex flex-col gap-2 p-4 pb-10">
                    {user ? (
                      <>
                        <p className="truncate px-1 pb-1 text-sm text-muted-foreground">{user.email}</p>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          nativeButton={false}
                          render={<Link href="/dashboard" onClick={() => setMobileOpen(false)} />}
                        >
                          Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          nativeButton={false}
                          render={<Link href="/dashboard/account" onClick={() => setMobileOpen(false)} />}
                        >
                          Account settings
                        </Button>
                        <LogoutButton className="w-full" variant="ghost" />
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          nativeButton={false}
                          render={<Link href="/login" onClick={() => setMobileOpen(false)} />}
                        >
                          Log in
                        </Button>
                        <Button
                          className="w-full justify-start"
                          nativeButton={false}
                          render={<Link href="/signup" onClick={() => setMobileOpen(false)} />}
                        >
                          Sign up
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme}>
                      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                      {isDark ? "Light mode" : "Dark mode"}
                    </Button>
                  </div>

                  <svg
                    className="absolute inset-x-0 top-full h-5 w-full text-popover"
                    viewBox="0 0 1200 60"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,30 C150,60 300,0 600,30 C900,60 1050,0 1200,30 L1200,0 L0,0 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </DialogPrimitive.Popup>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
