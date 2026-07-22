import { z } from "zod";

export const CAPTION_MAX_LENGTH = 140;

export const captionSchema = z.string().max(CAPTION_MAX_LENGTH, {
  message: `Caption must be ${CAPTION_MAX_LENGTH} characters or fewer.`,
});

export const cameraSelectionSchema = z.object({
  brandId: z.string().min(1, "Choose a camera brand."),
  modelId: z.string().min(1, "Choose a camera model."),
});

export const emailSchema = z.string().trim().min(1, "Email is required.").email("Enter a valid email address.");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

export const DISPLAY_NAME_MAX_LENGTH = 60;

export const profileSchema = z.object({
  displayName: z.string().trim().max(DISPLAY_NAME_MAX_LENGTH, {
    message: `Name must be ${DISPLAY_NAME_MAX_LENGTH} characters or fewer.`,
  }),
});

export const changePasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match.",
    path: ["confirmNewPassword"],
  });

export type ProfileInput = z.infer<typeof profileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
