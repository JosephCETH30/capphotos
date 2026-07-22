"use server";

import { createClient } from "@/lib/supabase/server";
import { encryptText } from "@/lib/crypto/text-cipher";

interface SavePhotoInput {
  id: string;
  caption: string;
  cameraBrandId: string;
  cameraModelId: string;
  imagePath: string;
}

export async function savePhotoRecord(input: SavePhotoInput): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase.from("photos").insert({
    id: input.id,
    user_id: user.id,
    caption: encryptText(input.caption.trim()),
    camera_brand_id: input.cameraBrandId,
    camera_model_id: input.cameraModelId,
    image_path: input.imagePath,
  });

  if (error) return { error: error.message };
  return {};
}

export async function renamePhotoRecord(id: string, name: string | null): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("photos")
    .update({ name: name ? encryptText(name) : null })
    .eq("id", id);

  if (error) return { error: error.message };
  return {};
}
