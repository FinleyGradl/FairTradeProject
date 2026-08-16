import { z } from "zod";
import { passwordSchema } from "@/lib/validators/auth";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Mindestens 2 Zeichen").max(80),
});

export const changeEmailSchema = z.object({
  newEmail: z.string().email("Ungültige E-Mail-Adresse"),
  currentPassword: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: passwordSchema,
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;