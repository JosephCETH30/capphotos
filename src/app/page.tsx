import { EditorPanel } from "@/components/editor/EditorPanel";
import { getAuthUser } from "@/lib/supabase/get-user";

export default async function HomePage() {
  const user = await getAuthUser();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Turn your shot into a keepsake, instantly.
        </h1>
        <p className="mt-3 text-balance text-muted-foreground sm:text-lg">
          Upload a photo, write a caption, and pick the camera it was shot on.
        </p>
      </section>

      <EditorPanel initialUser={user} />
    </div>
  );
}
