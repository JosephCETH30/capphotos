import { redirect } from "next/navigation";
import { AccountForm } from "@/components/dashboard/AccountForm";
import { getAuthUser } from "@/lib/supabase/get-user";

export default async function AccountPage() {
  const user = await getAuthUser();
  if (!user) redirect("/login?redirect=/dashboard/account");

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
        <p className="text-sm text-muted-foreground">Manage your profile and password.</p>
      </div>
      <AccountForm initialUser={user} />
    </div>
  );
}
