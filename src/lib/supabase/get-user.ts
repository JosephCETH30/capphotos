import type { User } from "@supabase/supabase-js";
import { createClient } from "./server";

/**
 * Resolves the current session server-side, treating a misconfigured or
 * unreachable Supabase project as "logged out" rather than crashing the page.
 */
export async function getAuthUser(): Promise<User | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  } catch {
    return null;
  }
}
