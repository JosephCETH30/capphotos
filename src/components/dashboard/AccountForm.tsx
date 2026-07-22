"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@supabase/supabase-js";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { getDisplayName, getInitials } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  changePasswordSchema,
  profileSchema,
  type ChangePasswordInput,
  type ProfileInput,
} from "@/lib/validation";

interface AccountFormProps {
  initialUser: User;
}

export function AccountForm({ initialUser }: AccountFormProps) {
  const [user, setUser] = useState(initialUser);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const profileForm = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { displayName: getDisplayName(initialUser) },
  });

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onProfileSubmit(values: ProfileInput) {
    setIsSavingProfile(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      data: { display_name: values.displayName },
    });
    if (error) {
      toast.error(error.message);
    } else {
      if (data.user) setUser(data.user);
      toast.success("Profile updated.");
    }
    setIsSavingProfile(false);
  }

  async function onPasswordSubmit(values: ChangePasswordInput) {
    setIsSavingPassword(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: values.newPassword });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated.");
      passwordForm.reset();
    }
    setIsSavingPassword(false);
  }

  const initials = getInitials(user);
  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how you&apos;ll appear around Caphoto.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarFallback className="text-base">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.email}</p>
              {joinedDate && (
                <p className="text-xs text-muted-foreground">Member since {joinedDate}</p>
              )}
            </div>
          </div>

          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="mt-5">
            <FieldGroup>
              <Field data-invalid={!!profileForm.formState.errors.displayName}>
                <FieldLabel htmlFor="displayName">Display name</FieldLabel>
                <Input
                  id="displayName"
                  placeholder="Add a name"
                  {...profileForm.register("displayName")}
                />
                <FieldError>{profileForm.formState.errors.displayName?.message}</FieldError>
              </Field>
              <Button type="submit" className="w-fit" disabled={isSavingProfile}>
                {isSavingProfile && <Loader2 className="size-4 animate-spin" />}
                Save profile
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update the password you use to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!passwordForm.formState.errors.newPassword}>
                <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...passwordForm.register("newPassword")}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError>{passwordForm.formState.errors.newPassword?.message}</FieldError>
              </Field>

              <Field data-invalid={!!passwordForm.formState.errors.confirmNewPassword}>
                <FieldLabel htmlFor="confirmNewPassword">Confirm new password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="confirmNewPassword"
                    type={showConfirmNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...passwordForm.register("confirmNewPassword")}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                      aria-label={showConfirmNewPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmNewPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError>{passwordForm.formState.errors.confirmNewPassword?.message}</FieldError>
              </Field>

              <Button type="submit" className="w-fit" disabled={isSavingPassword}>
                {isSavingPassword && <Loader2 className="size-4 animate-spin" />}
                Update password
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
