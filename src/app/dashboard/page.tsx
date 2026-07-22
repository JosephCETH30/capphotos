import { createClient } from "@/lib/supabase/server";
import { PhotoDashboardGrid } from "@/components/dashboard/PhotoDashboardGrid";
import type { DashboardPhoto, PhotoRow } from "@/types/photo";

const SIGNED_URL_EXPIRY_SECONDS = 60 * 60; // 1 hour

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<PhotoRow[]>();

  const photos: DashboardPhoto[] = await Promise.all(
    (rows ?? []).map(async (row) => {
      const { data } = await supabase.storage
        .from("photos")
        .createSignedUrl(row.image_path, SIGNED_URL_EXPIRY_SECONDS);
      return { ...row, signedUrl: data?.signedUrl ?? "" };
    })
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your photos</h1>
        <p className="text-sm text-muted-foreground">
          {photos.length} saved photo{photos.length === 1 ? "" : "s"}
        </p>
      </div>
      <PhotoDashboardGrid initialPhotos={photos.filter((photo) => photo.signedUrl)} />
    </div>
  );
}
