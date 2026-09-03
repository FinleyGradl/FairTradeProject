// src/lib/validators/store.ts
import { z } from "zod";

export const fairBadgeEnum = z.enum(["fairtrade", "wfto", "bcorp", "organic"]);

export const socialPlatformEnum = z.enum([
  "instagram",
  "facebook",
  "tiktok",
  "youtube",
  "twitter",
  "linkedin",
  "pinterest",
  "other",
]);

export const socialLinkSchema = z.object({
  platform: socialPlatformEnum,
  url: z.string().url("Ungültige URL"),
});

export const storeHourInputSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    openTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "HH:MM erwartet"),
    closeTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "HH:MM erwartet"),
    isClosed: z.boolean().default(false),
  })
  .refine((h) => h.isClosed || h.closeTime > h.openTime, {
    message: "Schließzeit muss nach der Öffnungszeit liegen",
    path: ["closeTime"],
  });

export const storeBaseSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(10).max(2000),
  addressLine: z.string().min(3).max(200),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(3).max(20),
  country: z.string().length(2).default("DE"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  phone: z.string().max(40).optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  // Up to 8 profiles (Instagram, Facebook, …) — see socialLinkSchema.
  // Owner/admin-only, same as fairBadges/categories below: not part of
  // the smaller "suggest an edit" field set.
  socialLinks: z.array(socialLinkSchema).max(8).optional(),
  email: z.string().email().optional().or(z.literal("")),
  // Either a full external URL (someone pastes a link to a hosted photo)
  // or one of our own uploaded-file paths from POST /cover, which is a
  // relative path rather than an absolute URL — see lib/uploads.ts.
  coverImage: z
    .string()
    .refine((v) => v.startsWith("/api/uploads/stores/") || z.string().url().safeParse(v).success, {
      message: "Ungültige Bild-URL.",
    })
    .optional()
    .or(z.literal("")),
  fairBadges: z.array(fairBadgeEnum).max(4).optional(),
  categories: z.array(z.string()).max(6).optional(),
  hours: z.array(storeHourInputSchema).max(7).optional(),
});

export const storeCreateSchema = storeBaseSchema;
export const storeUpdateSchema = storeBaseSchema.partial().extend({
  // Editing a store always resends the full set of fields we allow to
  // change; nothing here is a true partial-patch of a single key, but
  // keeping this a `.partial()` means callers can't accidentally wipe a
  // field by omitting it from a smaller client payload in the future.
  name: storeBaseSchema.shape.name,
  description: storeBaseSchema.shape.description,
  addressLine: storeBaseSchema.shape.addressLine,
  city: storeBaseSchema.shape.city,
  postalCode: storeBaseSchema.shape.postalCode,
  latitude: storeBaseSchema.shape.latitude,
  longitude: storeBaseSchema.shape.longitude,
});

export const storeClaimSchema = z.object({
  proofText: z.string().min(20, "Bitte beschreibe genauer, wie du den Laden verifizieren kannst.").max(2000),
  businessEmail: z.string().email("Ungültige E-Mail-Adresse").optional().or(z.literal("")),
});

// Deliberately a smaller field set than storeUpdateSchema: the "suggest an
// edit" flow is meant for the kind of thing any visitor might notice from
// outside (name, description, address, contact details, opening hours) —
// not for coverImage/badges/categories/geolocation, which stay
// owner/admin-only via the normal edit form.
export const storeEditSuggestionSchema = z
  .object({
    name: storeBaseSchema.shape.name.optional(),
    description: storeBaseSchema.shape.description.optional(),
    addressLine: storeBaseSchema.shape.addressLine.optional(),
    city: storeBaseSchema.shape.city.optional(),
    postalCode: storeBaseSchema.shape.postalCode.optional(),
    phone: z.string().max(40).optional().or(z.literal("")),
    website: z.string().url().optional().or(z.literal("")),
    email: z.string().email().optional().or(z.literal("")),
    hours: z.array(storeHourInputSchema).max(7).optional(),
    note: z.string().max(500).optional().or(z.literal("")),
  })
  .refine(
    (data) =>
      Object.entries(data).some(
        ([key, value]) => key !== "note" && value !== undefined
      ),
    { message: "Bitte ändere mindestens ein Feld." }
  );

export const editSuggestionVoteSchema = z.object({
  vote: z.enum(["confirm", "dispute"]),
});

export const storeAttestationSchema = z.object({
  vote: z.enum(["confirm", "dispute"]),
  reason: z.string().max(500).optional(),
}).refine((data) => data.vote !== "dispute" || (data.reason && data.reason.trim().length >= 10), {
  message: "Bitte gib einen kurzen Grund für die Meldung an (mind. 10 Zeichen).",
  path: ["reason"],
});

export const moderationActionSchema = z.object({
  action: z.enum(["approve", "reject"]),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(120).optional(),
  body: z.string().min(10).max(2000),
});

export const storesQuerySchema = z.object({
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radius: z.coerce.number().min(1).max(300).default(15),
  category: z.string().optional(),
  badge: z.string().optional(),
  q: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type StoreCreateInput = z.infer<typeof storeCreateSchema>;
export type StoreUpdateInput = z.infer<typeof storeUpdateSchema>;
export type StoreClaimInput = z.infer<typeof storeClaimSchema>;
export type StoreEditSuggestionInput = z.infer<typeof storeEditSuggestionSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type StoresQuery = z.infer<typeof storesQuerySchema>;