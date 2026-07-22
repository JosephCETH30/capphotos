import { redirect } from "next/navigation";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { getAuthUser } from "@/lib/supabase/get-user";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser();
  if (!user) redirect("/login?redirect=/dashboard");

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <DashboardTabs />
      {children}
    </div>
  );
}
