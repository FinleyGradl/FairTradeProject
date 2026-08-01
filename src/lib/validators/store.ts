import { z } from "zod";

export const fairBadgeEnum = z.enum(["fairtrade", "wfto", "bcorp", "organic"]);

export const storeCreateSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(10).max(2000),
  addressLine: z.string().min(3).max(200),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(3).max(20),
  country: z.string().length(2).default("DE"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  fairBadges: z.array(fairBadgeEnum).optional(),
  categories: z.array(z.string()).optional(),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(120).optional(),
  body: z.string().min(10).max(2000),
});

export const storesQuerySchema = z.object({
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radius: z.coerce.number().min(1).max(100).default(15),
  category: z.string().optional(),
  badge: z.string().optional(),
  q: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export type StoreCreateInput = z.infer<typeof storeCreateSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type StoresQuery = z.infer<typeof storesQuerySchema>;
