"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { DashboardPhoto } from "@/types/photo";

interface DeletePhotoDialogProps {
  photo: DashboardPhoto;
  onDeleted: (id: string) => void;
}

export function DeletePhotoDialog({ photo, onDeleted }: DeletePhotoDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const supabase = createClient();

    const { error: storageError } = await supabase.storage.from("photos").remove([photo.image_path]);
    if (storageError) {
      toast.error("Couldn't delete your photo. Please try again.");
      setIsDeleting(false);
      return;
    }

    const { error: rowError } = await supabase.from("photos").delete().eq("id", photo.id);
    if (rowError) {
      toast.error("Couldn't delete your photo. Please try again.");
      setIsDeleting(false);
      return;
    }

    toast.success("Photo deleted.");
    onDeleted(photo.id);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Trash2 className="size-4" />
        <span className="sr-only">Delete photo</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this photo?</AlertDialogTitle>
          <AlertDialogDescription>
            This can&apos;t be undone. The photo will be permanently removed from your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={isDeleting} onClick={handleDelete}>
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
