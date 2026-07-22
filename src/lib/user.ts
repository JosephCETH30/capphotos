import type { User } from "@supabase/supabase-js";

export function getDisplayName(user: User | null): string {
  const name = user?.user_metadata?.display_name;
  return typeof name === "string" && name.trim() ? name.trim() : "";
}

export function getInitials(user: User | null): string {
  const displayName = getDisplayName(user);
  if (displayName) {
    const parts = displayName.split(/\s+/).filter(Boolean);
    const initials = parts
      .slice(0, 2)
      .map((part) => part[0])
      .join("");
    if (initials) return initials.toUpperCase();
  }
  return user?.email ? user.email.slice(0, 2).toUpperCase() : "";
}
