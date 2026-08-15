import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Mindestens 8 Zeichen")
  .max(72, "Maximal 72 Zeichen")
  .regex(/[a-z]/, "Mindestens ein Kleinbuchstabe")
  .regex(/[A-Z]/, "Mindestens ein Großbuchstabe")
  .regex(/[0-9]/, "Mindestens eine Zahl");

export const registerSchema = z.object({
  name: z.string().min(2, "Mindestens 2 Zeichen").max(80),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(1, "Passwort erforderlich"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;