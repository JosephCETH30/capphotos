"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function useLogout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return { logout, isLoading };
}

interface LogoutButtonProps {
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
}

export function LogoutButton({ className, variant = "outline" }: LogoutButtonProps) {
  const { logout, isLoading } = useLogout();

  return (
    <Button
      type="button"
      variant={variant}
      className={cn("justify-start", className)}
      disabled={isLoading}
      onClick={logout}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      Log out
    </Button>
  );
}
