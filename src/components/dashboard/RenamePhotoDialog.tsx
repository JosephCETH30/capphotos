"use client";

import { useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DashboardPhoto } from "@/types/photo";

const NAME_MAX_LENGTH = 80;

interface RenamePhotoDialogProps {
  photo: DashboardPhoto;
  onRenamed: (id: string, name: string | null) => void;
}

export function RenamePhotoDialog({ photo, onRenamed }: RenamePhotoDialogProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(photo.name ?? "");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    const name = draft.trim() || null;
    setIsSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("photos").update({ name }).eq("id", photo.id);
    setIsSaving(false);
    if (error) {
      toast.error("Couldn't rename this photo. Please try again.");
      return;
    }
    onRenamed(photo.id, name);
    toast.success("Photo renamed.");
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setDraft(photo.name ?? "");
      }}
    >
      <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Pencil className="size-4" />
        <span className="sr-only">Rename photo</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename photo</DialogTitle>
          <DialogDescription>
            This name is used in your dashboard and as the downloaded file name.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-1.5">
          <Label htmlFor="photo-name">Name</Label>
          <Input
            id="photo-name"
            autoFocus
            placeholder="e.g. Coastal sunset"
            value={draft}
            maxLength={NAME_MAX_LENGTH}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button type="button" disabled={isSaving} onClick={handleSave}>
            {isSaving && <Loader2 className="size-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
